import type { Request, Response } from "express";

import rateLimit from "express-rate-limit";

import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

// Rate limiter configuration
const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: 300, // Limit each IP to 300 requests per `window` (15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    // Custom response when the limit is exceeded
    handler: (req: Request, res: Response) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            message: "Too many requests, please try again later.",
            error: "Rate limit exceeded",
        });
    },
});

export default limiter;
