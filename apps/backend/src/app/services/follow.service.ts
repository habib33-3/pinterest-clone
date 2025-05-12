import { StatusCodes } from "http-status-codes";

import { verifyToken } from "@/lib/jwt";

import ApiError from "@/shared/ApiError";

import type { FollowUserType } from "@/validations/follower.validations";

import { prisma } from "@/db/prisma";

import { findUserByUsername } from "./user.services";

export const followUserService = async (payload: FollowUserType) => {
    const { followerUsername, followingUsername } = payload;

    if (followerUsername === followingUsername) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "You cannot follow yourself");
    }

    const followerUser = await findUserByUsername(followerUsername);
    if (!followerUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Follower user not found");
    }

    const followingUser = await findUserByUsername(followingUsername);
    if (!followingUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User to follow not found");
    }

    return prisma.$transaction(async (tx) => {
        const existingFollow = await tx.follow.findFirst({
            where: {
                followerId: followerUser.id,
                followingId: followingUser.id,
            },
        });

        if (existingFollow) {
            await tx.follow.delete({
                where: { id: existingFollow.id },
            });
            return { message: "You are no longer following this user" };
        }

        await tx.follow.create({
            data: {
                followerId: followerUser.id,
                followingId: followingUser.id,
            },
        });

        return { message: "You are now following this user" };
    });
};

export const getFollowerCountService = async (username: string, token?: string) => {
    const user = await findUserByUsername(username);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const followerCount = await prisma.follow.count({
        where: {
            followingId: user.id,
        },
    });

    const followingCount = await prisma.follow.count({
        where: {
            followerId: user.id,
        },
    });

    let isFollowing = false;

    if (token) {
        const { id: userId } = verifyToken(token);

        if (userId !== user.id) {
            const followRecord = await prisma.follow.findFirst({
                where: {
                    followerId: userId,
                    followingId: user.id,
                },
            });
            isFollowing = !!followRecord;
        }
    }

    return {
        followerCount,
        followingCount,
        isFollowing,
    };
};
