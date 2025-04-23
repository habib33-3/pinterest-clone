import { StatusCodes } from "http-status-codes";

import { compareHashData, hashData } from "@/lib/hash";
import { createToken } from "@/lib/jwt";

import ApiError from "@/shared/ApiError";

import type { RegisterUserType } from "@/validations/user.validations";

import { prisma } from "@/db/prisma";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
};

export const registerUserService = async (data: RegisterUserType) => {
    const isUserExists = await findUserByEmail(data.email);

    if (isUserExists) {
        throw new ApiError(StatusCodes.CONFLICT, "User already exists");
    }

    const hashedPassword = await hashData(data.password);

    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true,
            userName: true,
            displayName: true,
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
