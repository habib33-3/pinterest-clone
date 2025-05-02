import { StatusCodes } from "http-status-codes";

import { compareHashData, hashData } from "@/lib/hash";
import { createToken } from "@/lib/jwt";

import ApiError from "@/shared/ApiError";

import type { RegisterUserType } from "@/validations/user.validations";

import { prisma } from "@/db/prisma";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string) => {
    return prisma.user.findUnique({ where: { id } });
};

export const registerUserService = async (data: RegisterUserType) => {
    const isEmailExists = await findUserByEmail(data.email);

    if (isEmailExists) {
        throw new ApiError(StatusCodes.CONFLICT, "Email already exists", "EMAIL_EXISTS");
    }

    const isUserNameExists = await prisma.user.findFirst({
        where: {
            userName: data.userName,
        },
    });

    if (isUserNameExists) {
        throw new ApiError(StatusCodes.CONFLICT, "Username already exists", "USERNAME_EXISTS");
    }

    const hashedPassword = await hashData(data.password);

    const displayName = data.email.split("@")[0];

    const user = await prisma.user.create({
        data: {
            ...data,
            displayName,
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true,
            userName: true,
            displayName: true,
            avatar: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    const token = createToken({
        id: user.id,
        email: user.email,
    });

    return {
        user,
        token,
    };
};

export const userLoginService = async (email: string, password: string) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const isPasswordMatch = await compareHashData(user.password, password);

    if (!isPasswordMatch) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }

    const token = createToken({
        id: user.id,
        email: user.email,
    });

    const { password: _password, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token,
    };
};

export const followUserService = async (followerId: string, followingId: string) => {
    if (followerId === followingId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "You cannot follow yourself");
    }

    const userToFollow = await findUserById(followingId);
    if (!userToFollow) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const isAlreadyFollowing = await prisma.follow.findFirst({
        where: {
            followerId,
            followingId,
        },
    });

    if (isAlreadyFollowing) {
        return { message: "You are already following this user" };
    }

    await prisma.follow.create({
        data: {
            followerId,
            followingId,
        },
    });

    return { message: "You are now following this user" };
};
