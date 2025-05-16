import { StatusCodes } from "http-status-codes";
import jwt, { JsonWebTokenError, type SignOptions, TokenExpiredError } from "jsonwebtoken";

import { env } from "@/config/env.config";

import ApiError from "@/shared/ApiError";

import type { TokenPayload } from "@/types";

const tokenOptions: SignOptions = {
    expiresIn: env.TOKEN_EXPIRATION,
    algorithm: "HS256",
};

export const createToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, tokenOptions);
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");
        }
        if (error instanceof TokenExpiredError) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Token expired");
        }

        throw new ApiError(StatusCodes.UNAUTHORIZED, "Token verification failed");
    }
};
