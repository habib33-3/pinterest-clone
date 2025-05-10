import type { Request } from "express";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { PostCommentType } from "@/validations/comment.validation";

import { getAllCommentsService, postCommentService } from "@/services/comment.service";

export const postCommentHandler = asyncHandler(
    async (req: Request<{}, {}, PostCommentType>, res) => {
        const userId = req.user?.id as string;

        const result = await postCommentService(req.body, userId);

        sendResponse(req, res, {
            message: "Comment created successfully",
            data: result,
        });
    }
);

export const getAllCommentsHandler = asyncHandler(async (req: Request<{ pinId: string }>, res) => {
    const { pinId } = req.params;

    const result = await getAllCommentsService(pinId);

    sendResponse(req, res, {
        message: "Comments fetched successfully",
        data: result,
    });
});
