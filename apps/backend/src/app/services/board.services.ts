import { prisma } from "@/db/prisma";

export const getAllBoardsService = async (userId: string) => {
    return prisma.board.findMany({
        where: {
            userId: userId,
        },
    });
};
