import type { Request } from "express";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { FollowUserType } from "@/validations/follower.validations";

import { followUserService, getFollowerCountService } from "@/services/follow.service";

export const followUserHandler = asyncHandler(async (req: Request<{}, {}, FollowUserType>, res) => {
    const { followerUsername, followingUsername } = req.body;

    const result = await followUserService({ followerUsername, followingUsername });

    sendResponse(req, res, {
        message: result.message,
        data: result,
    });
});

export const getFollowerUserHandlers = asyncHandler(
    async (req: Request<{ followerUsername: string }>, res) => {
        const token = req.cookies.token;

        const { followerUsername } = req.params;

        const result = await getFollowerCountService(followerUsername, token);

        sendResponse(req, res, {
            message: "Follower count fetched successfully",
            data: result,
        });
    }
);
