import type { Request } from "express";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { LikePinType } from "@/validations/like.validation";

import { getPinsLikeCountService, likePinService } from "@/services/like.services";

export const likePinHandler = asyncHandler(async (req: Request<LikePinType>, res) => {
    const { pinId } = req.params;

    const userId = req.user?.id as string;

    const result = await likePinService(pinId, userId);

    sendResponse(req, res, {
        message: "Pin liked successfully",
        data: result,
    });
});

export const getLikesCountHandler = asyncHandler(async (req: Request<LikePinType>, res) => {
    const { pinId } = req.params;

    const token = req.cookies.token;

    const result = await getPinsLikeCountService(pinId, token);

    sendResponse(req, res, {
        message: "Likes count fetched successfully",
        data: result,
    });
});
