import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "@/config/env.config";

import type { TokenPayload } from "@/types";

const tokenOptions: SignOptions = {
    expiresIn: env.TOKEN_EXPIRATION,
    algorithm: "HS256",
};

export const createToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, tokenOptions);
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};
