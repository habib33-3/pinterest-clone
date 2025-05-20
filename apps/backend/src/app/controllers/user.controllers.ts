import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { deleteCookie, setCookie } from "@/lib/cookie";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { LoginUserType, RegisterUserType } from "@/validations/user.validations";

import {
    getUsersProfileService,
    registerUserService,
    userLoginService,
} from "@/services/user.services";

export const registerUserHandler = asyncHandler(
    async (req: Request<{}, {}, RegisterUserType>, res) => {
        const payload = req.body;

        const result = await registerUserService(payload);

        setCookie(res, env.COOKIE_NAME, result.token);

        sendResponse(req, res, {
            statusCode: StatusCodes.CREATED,
            message: "User created successfully",
            data: result.user,
        });
    }
);

export const userLoginHandler = asyncHandler(async (req: Request<{}, {}, LoginUserType>, res) => {
    const { email, password } = req.body;

    const result = await userLoginService(email, password);

    setCookie(res, env.COOKIE_NAME, result.token);

    sendResponse(req, res, {
        message: "User login successfully",
        data: result.user,
    });
});

export const userLogoutHandler = asyncHandler(async (req, res) => {
    deleteCookie(res, env.COOKIE_NAME);

    sendResponse(req, res, {
        message: "User logout successfully",
    });
});

export const getUsersProfileHandler = asyncHandler(async (req, res) => {
    const { userName } = req.params;

    const result = await getUsersProfileService(userName);

    sendResponse(req, res, {
        message: "Users fetched successfully",
        data: result,
    });
});
