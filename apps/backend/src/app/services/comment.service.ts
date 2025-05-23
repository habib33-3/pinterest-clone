import { StatusCodes } from "http-status-codes";

import ApiError from "@/shared/ApiError";

import type { PostCommentType, UpdateCommentType } from "@/validations/comment.validation";

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
            createdAt: true,
            user: {
                select: {
                    id: true,
                    displayName: true,
                    avatar: true,
                    userName: true,
                },
            },
        },
    });
};

export const updateCommentService = async (
    commentId: string,
    payload: UpdateCommentType,
    userId: string
) => {
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        select: { id: true, userId: true },
    });

    if (!comment) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
    }

    if (comment.userId !== userId) {
        throw new ApiError(StatusCodes.FORBIDDEN, "You are not allowed to update this comment");
    }

    return prisma.comment.update({
        where: {
            id: commentId,
            userId,
        },
        data: {
            comment: payload.comment,
        },
    });
};

export const deleteCommentService = async (commentId: string, userId: string) => {
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        select: { id: true, userId: true },
    });

    if (!comment) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
    }

    if (comment.userId !== userId) {
        throw new ApiError(StatusCodes.FORBIDDEN, "You are not allowed to delete this comment");
    }

    await prisma.comment.deleteMany({
        where: {
            id: commentId,
            userId,
        },
    });

    return {
        message: "Comment deleted successfully",
    };
};
