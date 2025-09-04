/* eslint-disable security/detect-object-injection */
import { faker } from "@faker-js/faker";

import { hashData } from "@/lib/hash";

import { logger } from "@/shared/logger";

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
    logger.info("Starting database cleanup...");

    await prisma.follow.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.like.deleteMany();
    await prisma.boardPin.deleteMany();
    await prisma.pin.deleteMany();
    await prisma.board.deleteMany();
    await prisma.user.deleteMany();

    logger.info("Database cleaned.");

    logger.info("Creating demo user...");
    await prisma.user.create({
        data: {
            email: "user@email.com",
            password: await hashData("password"),
            displayName: "Demo User",
            userName: "demo",
        },
    });
    logger.info("Demo user created.");

    logger.info("Generating fake users...");
    const usersData = await Promise.all(
        Array.from({ length: 3 }).map(async () => ({
            email: faker.internet.email(),
            password: await hashData("password"),
            displayName: faker.person.fullName(),
            userName: faker.internet.username(),
            avatar: faker.image.avatar(),
        }))
    );
    logger.info("Fake users data prepared.");

    logger.info("Creating users in database...");
    await prisma.user.createMany({ data: usersData });
    logger.info("Users created.");

    logger.info("Fetching all users...");
    const users = await prisma.user.findMany();
    logger.info(`Fetched ${users.length} users.`);

    logger.info("Preparing boards data...");
    const boardsData = [];
    for (const user of users) {
        const numBoards = faker.number.int({ min: 1, max: 2 });
        for (let j = 0; j < numBoards; j++) {
            boardsData.push({
                title: faker.lorem.words(3),
                description: faker.lorem.sentence(),
                thumbnail: faker.image.urlPicsumPhotos(),
                userId: user.id,
            });
        }
    }
    logger.info(`Prepared ${boardsData.length} boards.`);

    logger.info("Creating boards...");
    await prisma.board.createMany({ data: boardsData });
    logger.info("Boards created.");

    logger.info("Fetching all boards...");
    const boards = await prisma.board.findMany();
    logger.info(`Fetched ${boards.length} boards.`);

    logger.info("Preparing pins, boardPins, likes, and comments data...");
    const pinsData = [];
    const boardPinsData = [];
    const likesData = [];
    const commentsData = [];

    for (const board of boards) {
        const user = users.find((u) => u.id === board.userId);
        if (!user) {
            logger.warn(`User not found for boardId ${board.id}`);
            continue;
        }

        const numPins = faker.number.int({ min: 1, max: 3 });
        for (let k = 0; k < numPins; k++) {
            pinsData.push({
                media: faker.image.url(),
                width: faker.number.int({ min: 200, max: 1920 }),
                height: faker.number.int({ min: 200, max: 1080 }),
                title: faker.lorem.words(2),
                description: faker.lorem.sentences(2),
                link: faker.internet.url(),
                tags: faker.helpers.arrayElements(["design", "tech", "nature", "art", "code"], 3),
                userId: user.id,
                boardId: board.id,
            });
        }
    }
    logger.info(`Prepared ${pinsData.length} pins.`);

    logger.info("Creating pins (excluding boardId)...");
    const pinsCreateData = pinsData.map(({ boardId: _, ...rest }) => rest);
    await prisma.pin.createMany({ data: pinsCreateData });
    logger.info("Pins created.");

    logger.info("Fetching pins...");
    const pins = await prisma.pin.findMany();
    logger.info(`Fetched ${pins.length} pins.`);

    logger.info("Linking pins to boards and preparing likes and comments...");
    for (let i = 0; i < pins.length; i++) {
        const pin = pins[i];
        const boardId = pinsData[i].boardId;

        boardPinsData.push({
            boardId,
            pinId: pin.id,
        });

        const likeCount = faker.number.int({ min: 0, max: 1 });
        for (let l = 0; l < likeCount; l++) {
            const likeUser = faker.helpers.arrayElement(users);
            likesData.push({
                userId: likeUser.id,
                pinId: pin.id,
            });
        }

        const commentCount = faker.number.int({ min: 0, max: 1 });
        for (let c = 0; c < commentCount; c++) {
            const commentUser = faker.helpers.arrayElement(users);
            commentsData.push({
                comment: faker.lorem.sentence(),
                userId: commentUser.id,
                pinId: pin.id,
            });
        }
    }
    logger.info(
        `Prepared ${boardPinsData.length} boardPins, ${likesData.length} likes, and ${commentsData.length} comments.`
    );

    logger.info("Creating boardPins...");
    await prisma.boardPin.createMany({ data: boardPinsData });
    logger.info("BoardPins created.");

    logger.info("Creating likes...");
    await prisma.like.createMany({ data: likesData });
    logger.info("Likes created.");

    logger.info("Creating comments...");
    await prisma.comment.createMany({ data: commentsData });
    logger.info("Comments created.");

    logger.info("Preparing follow relationships...");
    const followData = [];
    for (const user of users) {
        const otherUsers = users.filter((u) => u.id !== user.id);
        const followed = faker.helpers.arrayElements(
            otherUsers,
            faker.number.int({ min: 1, max: 2 })
        );
        for (const f of followed) {
            followData.push({
                followerId: user.id,
                followingId: f.id,
            });
        }
    }
    logger.info(`Prepared ${followData.length} follow relationships.`);

    logger.info("Creating follow relationships...");
    await prisma.follow.createMany({ data: followData });
    logger.info("Follow relationships created.");

    logger.info("🌱 seed data created successfully.");
}

main()
    .catch((e) => {
        logger.error(`❌ Error seeding the database: ${e}`);
        // eslint-disable-next-line no-process-exit, n/no-process-exit
        process.exit(1);
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .finally(async () => prisma.$disconnect());
