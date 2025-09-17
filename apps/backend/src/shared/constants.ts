/* eslint-disable @typescript-eslint/no-magic-numbers */

export const NodeEnv = ["dev", "test", "production"] as const;

export const DEFAULT_PORT = 5000;

export const DEFAULT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

export const DEFAULT_TOKEN_EXPIRATION = "1d";

export const DEFAULT_MAX_REQUESTS = 300;

export const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const COOKIE_NAME = "pinterest-clone-token";
