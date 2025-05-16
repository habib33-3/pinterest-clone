import type { Response } from "express";

import { env } from "@/config/env.config";

export const setCookie = (res: Response, cookieName: string, cookieValue: string) => {
    const isProduction = env.NODE_ENV === "production";

    res.cookie(cookieName, cookieValue, {
        maxAge: env.TOKEN_EXPIRATION,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
};

export const deleteCookie = (res: Response, cookieName: string) => {
    res.clearCookie(cookieName, {
        maxAge: 0,
    });
};
