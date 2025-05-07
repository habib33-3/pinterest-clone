import { StatusCodes } from "http-status-codes";

import { uploadImageToImageKit } from "@/lib/image-kit";

import ApiError from "@/shared/ApiError";

import type { CreatePinType } from "@/validations/pin.validation";

import { prisma } from "@/db/prisma";

import { findUserById } from "./user.services";

export const createPinService = async (
    data: CreatePinType,
    uploadedImage: Express.Multer.File,
    user: string
) => {
    // Validate: either an existing board or a new board title must be provided
    if (!data?.board && !data?.newBoardTitle) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "New Board Title or Board Id is required");
    }

    // Validate: if creating a new board, newBoardTitle must be non-empty
    if (data.board === "new-board" && !data?.newBoardTitle?.trim()) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "New Board Title is required when creating a new board"
        );
    }

    // Check if user exists
    const userExists = await findUserById(user);
    if (!userExists) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    // Upload image to ImageKit with additional canvas/text config
    const img = await uploadImageToImageKit(uploadedImage, "pins", {
        canvasOptionsString: data.canvasOptions,
        textOptionsString: data.textOptions,
        textBoxOptionsString: data.textBoxOptions,
    });

    // Validate: image upload must succeed
    if (!img || !img.url) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Image upload failed");
    }

    // If user is creating a new board
    if (data.newBoardTitle !== undefined) {
        const isPrivate = Boolean(data.isNewBoardPrivate);

        // Create board and pin in a transaction to ensure atomicity
        return prisma.$transaction(async (tx) => {
            const boardTitle = data.newBoardTitle as string;

            // Create the new board
            const board = await tx.board.create({
                data: {
                    title: boardTitle,
                    userId: user,
                    thumbnail: img.url,
                    description: data.newBoardDescription ?? "",
                    isPrivate: isPrivate,
                },
            });

            // Create the pin associated with the new board
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

    // If pin is to be added to an existing board
    if (data.board !== "new-board") {
        const board = await prisma.board.findUnique({
            where: {
                id: data.board,
            },
        });

        // Validate: ensure board exists
        if (!board) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
        }

        // Create pin and associate it with the existing board
        return prisma.pin.create({
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
    }
};
