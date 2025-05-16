import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import { verifyToken } from "@/lib/jwt";

const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "No token provided, unauthorized",
        });

        return;
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: err.message,
        });
    }
};

export default verifyAuth;
