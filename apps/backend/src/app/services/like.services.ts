import { verifyToken } from "@/lib/jwt";

import { prisma } from "@/db/prisma";

export const likePinService = async (pinId: string, userId: string) => {
    const alreadyLiked = await prisma.like.findFirst({
        where: {
            pinId,
            userId,
        },
    });

    if (alreadyLiked) {
        await prisma.like.delete({
            where: {
                id: alreadyLiked.id,
            },
        });

        return {
            message: "You unliked the pin",
        };
    }

    await prisma.like.create({
        data: {
            pinId,
            userId,
        },
    });

    return {
        message: "You liked the pin",
    };
};

export const getPinsLikeCountService = async (pinId: string, token: string) => {
    if (!token) {
        return {
            isLiked: false,
            count: await prisma.like.count({
                where: { pinId },
            }),
        };
    }

    const { id: userId } = verifyToken(token);

    const [alreadyLiked, likeCount] = await Promise.all([
        prisma.like.findFirst({
            where: { pinId, userId },
        }),
        prisma.like.count({
            where: { pinId },
        }),
    ]);

    return {
        isLiked: !!alreadyLiked,
        count: likeCount,
    };
};
