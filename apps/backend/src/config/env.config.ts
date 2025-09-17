/* eslint-disable no-process-env */
import "dotenv/config";
import ms, { type StringValue } from "ms";
import { z } from "zod";

import {
    COOKIE_NAME,
    DEFAULT_MAX_FILE_SIZE,
    DEFAULT_MAX_REQUESTS,
    DEFAULT_PORT,
    DEFAULT_RATE_LIMIT_WINDOW_MS,
    DEFAULT_TOKEN_EXPIRATION,
    NodeEnv,
} from "@/shared/constants";
import { logger } from "@/shared/logger";

const envSchema = z.object({
    NODE_ENV: z.enum(NodeEnv).default("dev"),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    PORT: z.coerce.number().min(1).max(65535).default(DEFAULT_PORT),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().min(1).default(DEFAULT_RATE_LIMIT_WINDOW_MS),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string(),
    CORS_ORIGINS: z
        .string()
        .optional()
        .transform((val) => {
            if (!val) return [];
            return val.split(",").map((origin) => origin.trim());
        }),
    TOKEN_EXPIRATION: z
        .string()
        .default(DEFAULT_TOKEN_EXPIRATION)
        .transform((val, ctx) => {
            const result = ms(val as StringValue);
            if (typeof result !== "number") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "TOKEN_EXPIRATION must be a valid duration string like '1h', '7d', etc.",
                });
                return z.NEVER;
            }
            return result;
        }),
    IMAGEKIT_PUBLIC_KEY: z.string(),
    IMAGEKIT_PRIVATE_KEY: z.string(),
    IMAGEKIT_URL_ENDPOINT: z.string(),

    MAX_REQUESTS: z.coerce.number().min(1).default(DEFAULT_MAX_REQUESTS),
    MAX_FILE_SIZE: z.coerce.number().min(1).default(DEFAULT_MAX_FILE_SIZE),
    COOKIE_NAME: z.string().default(COOKIE_NAME),
});

export const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    const errorMessages = parsedEnv.error.errors
        .map((err) => `Environment variable '${err.path.join(".")}' is invalid: ${err.message}`)
        .join("\n");

    logger.error(`Invalid environment variables:\n${errorMessages}`);
    throw new Error(`Invalid environment variables:\n${errorMessages}`);
}

export const env = parsedEnv.data;
