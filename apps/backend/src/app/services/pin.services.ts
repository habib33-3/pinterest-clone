import { StatusCodes } from "http-status-codes";
import type { UploadResponse } from "imagekit/dist/libs/interfaces";

import { uploadImageToImageKit } from "@/lib/image-kit";

import ApiError from "@/shared/ApiError";

import type {
    CreatePinType,
    SavePinToNewBoardType,
    SavePinType,
} from "@/validations/pin.validation";

import { prisma } from "@/db/prisma";

import { findUserById } from "./user.services";

const handleImageUpload = async (file: Express.Multer.File, data: CreatePinType) => {
    const img = await uploadImageToImageKit(file, "pins", {
        canvasOptionsString: data.canvasOptions,
        textOptionsString: data.textOptions,
        textBoxOptionsString: data.textBoxOptions,
    });

    if (!img || !img.url) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Image upload failed");
    }

    return img;
};

const createNewBoardWithPin = async (data: CreatePinType, img: UploadResponse, user: string) => {
    const boardTitle = data.newBoardTitle as string;

    return prisma.$transaction(async (tx) => {
        const board = await tx.board.create({
            data: {
                title: boardTitle,
                userId: user,
                thumbnail: img.url,
                description: data.newBoardDescription ?? "",
                isPrivate: data.isNewBoardPrivate,
            },
        });

        const pin = await tx.pin.create({
            data: {
                title: data.title,
                description: data.description ?? "",
                link: data.link ?? "",
                media: img.url,

                width: img.width,
                height: img.height,
                userId: user,
            },
        });

        return tx.boardPin.create({
            data: {
                pinId: pin.id,
                boardId: board.id,
            },
        });
    });
};

const createPinOnExistingBoard = async (
    data: CreatePinType,
    img: UploadResponse,
    userId: string
) => {
    return prisma.$transaction(async (tx) => {
        const board = await tx.board.findUnique({
            where: {
                id: data.board as string,
            },
        });

        if (!board) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
        }

        const pin = await tx.pin.create({
            data: {
                title: data.title,
                description: data.description ?? "",
                link: data.link ?? "",
                media: img.url,

                width: img.width,
                height: img.height,
                userId,
            },
        });

        return tx.boardPin.create({
            data: {
                pinId: pin.id,
                boardId: board.id,
            },
        });
    });
};

export const createPinService = async (
    data: CreatePinType,
    uploadedImage: Express.Multer.File,
    userId: string
) => {
    if (!data?.board && !data?.newBoardTitle) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "New Board Title or Board Id is required");
    }

    if (data.board === "new-board" && !data?.newBoardTitle?.trim()) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "New Board Title is required when creating a new board"
        );
    }

    const user = await findUserById(userId);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const img = await handleImageUpload(uploadedImage, data);

    if (data.newBoardTitle !== undefined) {
        return createNewBoardWithPin(data, img, user.id);
    }

    return createPinOnExistingBoard(data, img, user.id);
};

export const getAllPinsService = async (searchQuery: string) => {
    if (!searchQuery) {
        return prisma.pin.findMany();
    }

    return prisma.pin.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: searchQuery,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: searchQuery,
                        mode: "insensitive",
                    },
                },
                {
                    tags: {
                        hasSome: [searchQuery.toLowerCase()],
                    },
                },
            ],
        },
    });
};

export const getSinglePinByIdService = async (pinId: string) => {
    const pin = await prisma.pin.findUnique({
        where: { id: pinId },
        select: {
            user: {
                select: {
                    id: true,
                    displayName: true,
                    avatar: true,
                    userName: true,
                },
            },
            id: true,
            title: true,
            width: true,
            height: true,
            description: true,
            link: true,
            media: true,
            tags: true,
        },
    });

    if (!pin) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Pin not found");
    }

    return pin;
};

export const savePinService = async ({ boardId, pinId }: SavePinType, userId: string) => {
    const board = await prisma.board.findUnique({
        where: {
            id: boardId,
            userId,
        },
    });

    if (!board) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }

    await prisma.boardPin.upsert({
        where: {
            pinId_boardId: {
                pinId,
                boardId,
            },
        },
        update: {},
        create: {
            pinId,
            boardId,
        },
    });

    return {
        message: "Pin saved successfully",
    };
};

export const savePinToNewBoardService = async (payload: SavePinToNewBoardType, userId: string) => {
    const { pinId, newBoardTitle, isNewBoardPrivate } = payload;

    return prisma.$transaction(async (tx) => {
        const pin = await tx.pin.findUniqueOrThrow({
            where: { id: pinId },
            select: { id: true, media: true },
        });

        const board = await tx.board.create({
            data: {
                title: newBoardTitle,
                userId,
                thumbnail: pin.media,
                isPrivate: isNewBoardPrivate,
            },
        });

        await tx.boardPin.create({
            data: {
                pinId,
                boardId: board.id,
            },
        });

        return {
            message: "Pin saved successfully",
        };
    });
};
