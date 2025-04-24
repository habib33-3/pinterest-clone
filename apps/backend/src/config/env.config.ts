/* eslint-disable no-process-env */
import "dotenv/config";
import ms, { type StringValue } from "ms";
import { z } from "zod";

import { DEFAULT_PORT, DEFAULT_RATE_LIMIT_WINDOW_MS } from "@/shared/constants";
import { logger } from "@/shared/logger";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    PORT: z.coerce.number().min(1).max(65535).default(DEFAULT_PORT),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().min(1).default(DEFAULT_RATE_LIMIT_WINDOW_MS),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string(),
    TOKEN_EXPIRATION: z.string().transform((val, ctx) => {
        const result = ms(val as StringValue);
        if (typeof result !== "number") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "TOKEN_EXPIRATION must be a valid duration string like '1h', '7d', etc.",
            });
            return z.NEVER;
        }
        return result;
    }),
    IMAGEKIT_PUBLIC_KEY: z.string(),
    IMAGEKIT_PRIVATE_KEY: z.string(),
    IMAGEKIT_URL_ENDPOINT: z.string(),
});

export const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    const errorMessages = parsedEnv.error.errors
        .map((err) => {
            return `Environment variable '${err.path.join(".")}' is invalid: ${err.message}`;
        })
        .join("\n");

    logger.error(`Invalid environment variables:\n${errorMessages}`);
    throw new Error(`Invalid environment variables:\n${errorMessages}`);
}

export const env = parsedEnv.data;
