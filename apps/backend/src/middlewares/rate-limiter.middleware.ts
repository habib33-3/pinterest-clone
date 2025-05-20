import type { Request, Response } from "express";

import rateLimit from "express-rate-limit";

import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req: Request, res: Response) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            message: "Too many requests, please try again later.",
            error: "Rate limit exceeded",
        });
    },
});

export default limiter;
