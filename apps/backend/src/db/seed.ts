import { logger } from "@/shared/logger";

import { prisma } from "./prisma";

const seed = async () => {
    await prisma.comment.deleteMany();
    await prisma.like.deleteMany();

    await prisma.pin.deleteMany();
    await prisma.board.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.user.deleteMany();
    logger.info("🌱 Database seeded.");
};

seed().catch((e) => logger.error(e));
