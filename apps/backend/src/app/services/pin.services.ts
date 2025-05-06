import { StatusCodes } from "http-status-codes";

import { uploadImageToImageKit } from "@/lib/image-kit";

import ApiError from "@/shared/ApiError";

import type { CreatePinType } from "@/validations/pin.validation";

import { prisma } from "@/db/prisma";

export const createBoardService = async (title: string, user: string) => {
    return prisma.board.create({
        data: {
            title,
            userId: user,
        },
    });
};

export const createNewPinAndBoard = async (
    data: CreatePinType,
    user: string,
    img: Express.Multer.File
) => {
    const uploadedImg = await uploadImageToImageKit(img, "pins");

    return prisma.$transaction(async (tx) => {
        console.dir(data, {
            depth: Infinity,
        });

        const board = await tx.board.create({
            data: {
                title: data.newBoardTitle as string,
                userId: user,
            },
        });

        return tx.pin.create({
            data: {
                description: data.description ?? "",
                height: uploadedImg.height,
                link: data.link ?? "",
                media: uploadedImg.url,
                title: data.title,
                width: uploadedImg.width,
                boardId: board.id,
                userId: user,
            },
        });
    });
};
