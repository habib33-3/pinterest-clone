import { StatusCodes } from "http-status-codes";

import { getImageKitTransformationString, uploadImageToImageKit } from "@/lib/image-kit";

import ApiError from "@/shared/ApiError";

import type { CreatePinType } from "@/validations/pin.validation";

import { prisma } from "@/db/prisma";

export const createPinService = async (
    data: CreatePinType,
    uploadedImage: Express.Multer.File,
    user: string
) => {
    if (!data?.board && !data?.newBoardTitle) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "New Board Title or Board Id is required");
    }

    if (
        data.board === "new-board" &&
        (!data?.newBoardTitle || String(data.newBoardTitle).trim() === "")
    ) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "New Board Title is required when creating a new board"
        );
    }

    const img = await uploadImageToImageKit(uploadedImage, "pins", {
        canvasOptionsString: data.canvasOptions,
        textOptionsString: data.textOptions,
        textBoxOptionsString: data.textBoxOptions,
    });

    if (!img) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Image upload failed");
    }

    if (data.newBoardTitle !== undefined) {
        return prisma.$transaction(async (tx) => {
            const boardTitle = data.newBoardTitle as string;
            const board = await tx.board.create({
                data: {
                    title: boardTitle,
                    userId: user,
                },
            });

            return tx.pin.create({
                data: {
                    title: data.title,
                    description: data.description ?? "",
                    link: data.link ?? "",
                    media: img.url,
                    boardId: board.id,
                    width: img.width,
                    height: img.height,
                    userId: user,
                },
            });
        });
    }

    if (data.board) {
        return prisma.pin.create({
            data: {
                title: data.title,
                description: data.description ?? "",
                link: data.link ?? "",
                media: img.url,
                boardId: data.board,
                width: img.width,
                height: img.height,
                userId: user,
            },
        });
    }
};
