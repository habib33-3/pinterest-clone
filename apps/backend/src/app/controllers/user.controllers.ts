import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import { deleteCookie, setCookie } from "@/lib/cookie";

import asyncHandler from "@/shared/asyncHandler";
import { COOKIE_NAME } from "@/shared/constants";
import sendResponse from "@/shared/sendResponse";

import type { LoginUserType, RegisterUserType } from "@/validations/user.validations";

import { registerUserService, userLoginService } from "@/services/user.services";

export const registerUserHandler = asyncHandler(
    async (req: Request<{}, {}, RegisterUserType>, res) => {
        const payload = req.body;

        const result = await registerUserService(payload);

        setCookie(res, COOKIE_NAME, result.token);

        sendResponse(req, res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "User created successfully",
            data: result.user,
        });
    }
);

export const userLoginHandler = asyncHandler(async (req: Request<{}, {}, LoginUserType>, res) => {
    const { email, password } = req.body;

    const result = await userLoginService(email, password);

    setCookie(res, COOKIE_NAME, result.token);

    sendResponse(req, res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User login successfully",
        data: result.user,
    });
});

export const userLogoutHandler = asyncHandler(async (req, res) => {
    deleteCookie(res, COOKIE_NAME);

    sendResponse(req, res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User logout successfully",
    });
});
