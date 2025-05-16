import { StatusCodes } from "http-status-codes";

import ApiError from "@/shared/ApiError";

import type { RemovePinFromBoardType } from "@/validations/board.validation";

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

export const getSavedBoardService = async (userId: string, pinId: string) => {
    return prisma.board.findFirst({
        where: {
            userId: userId,
            BoardPin: {
                some: {
                    pinId: pinId,
                },
            },
        },
    });
};

export const removePinFromBoardService = async (
    { boardId, pinId }: RemovePinFromBoardType,
    userId: string
) => {
    const pin = await prisma.pin.findUnique({
        where: {
            id: pinId,
        },
    });

    if (!pin) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Pin not found");
    }

    const board = await prisma.board.findUnique({
        where: {
            id: boardId,
            userId,
        },
    });

    if (!board) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }

    await prisma.boardPin.delete({
        where: {
            pinId_boardId: {
                pinId: pinId,
                boardId: boardId,
            },
        },
    });

    return {
        message: "Pin removed successfully",
    };
};
