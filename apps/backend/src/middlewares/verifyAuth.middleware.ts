import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import { verifyToken } from "@/lib/jwt";

import { prisma } from "@/db/prisma";

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
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

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "User not found, unauthorized",
            });
            return;
        }

        req.user = {
            ...(req.user || {}),
            id: user.id,
            email: user.email,
        };
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
