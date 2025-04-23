import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import { verifyToken } from "@/lib/jwt";

const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (_err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default verifyAuth;
