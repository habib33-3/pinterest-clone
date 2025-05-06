import { prisma } from "@/db/prisma";

export const createBoardService = async (title: string, user: string) => {
    return prisma.board.create({
        data: {
            title,
            userId: user,
        },
    });
};

export const getAllBoardsService = async (user: string) => {
    return prisma.board.findMany({
        where: {
            userId: user,
        },
    });
};
