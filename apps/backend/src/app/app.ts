import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import { logger } from "@/shared/logger";

import globalErrorMiddleware from "@/middlewares/global-error.middleware";
import notFoundMiddleware from "@/middlewares/not-found.middleware";
import limiter from "@/middlewares/rate-limiter";

import router from "./routes/router";

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// CORS, Helmet, and Rate Limiter
app.use(cors());
app.use(helmet());
app.use(limiter);

// Logger middleware (after security and rate limiting)
app.use(logger.middleware);

app.use("/api/v1", router);

// Error handling middleware
app.use(globalErrorMiddleware);

// Not found handler (after global error handler)
app.use(notFoundMiddleware);

export default app;
