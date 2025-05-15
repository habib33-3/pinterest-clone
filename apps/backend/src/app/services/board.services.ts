import { prisma } from "@/db/prisma";

export const getAllBoardsService = async (userId: string, searchQuery: string) => {
    return prisma.board.findMany({
        where: {
            userId: userId,
            title: {
                contains: searchQuery,
            },
        },
    });
};
