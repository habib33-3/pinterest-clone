import { prisma } from "@/db/prisma";

export const getAllBoardsService = async (user: string) => {
    return prisma.board.findMany({
        where: {
            userId: user,
        },
    });
};
