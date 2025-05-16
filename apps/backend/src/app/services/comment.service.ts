import { StatusCodes } from "http-status-codes";

import ApiError from "@/shared/ApiError";

import type { PostCommentType } from "@/validations/comment.validation";

import { prisma } from "@/db/prisma";

export const postCommentService = async (payload: PostCommentType, userId: string) => {
    const { pinId, comment } = payload;

    const pin = await prisma.pin.findUnique({
        where: { id: pinId },
        select: { id: true },
    });

    if (!pin) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Pin not found");
    }

    return prisma.comment.create({
        data: {
            comment,
            pinId: pin.id,
            userId,
        },
    });
};

export const getAllCommentsService = async (pinId: string) => {
    return prisma.comment.findMany({
        where: {
            pinId,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            comment: true,
            user: {
                select: {
                    id: true,
                    displayName: true,
                    avatar: true,
                },
            },
        },
    });
};
