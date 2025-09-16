import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

import globalErrorMiddleware from "@/middlewares/global-error.middleware";
import notFoundMiddleware from "@/middlewares/not-found.middleware";
import limiter from "@/middlewares/rate-limiter.middleware";

import router from "./routes/router";

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        origin: env.CORS_ORIGINS.length > 0 ? env.CORS_ORIGINS : "*",
    })
);

app.use(helmet());
app.use(limiter);

// Logger middleware (after security and rate limiting)
app.use(logger.middleware);

// Health check (before error handling)
app.get("/health", (_req, res) => {
    res.status(StatusCodes.OK).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/v1", router);

// Error handling middleware
app.use(globalErrorMiddleware);

// Not found handler
app.use(notFoundMiddleware);

export default app;
