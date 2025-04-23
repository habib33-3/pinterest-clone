import type { NextFunction, Request, Response } from "express";

import chalk from "chalk";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";

type LogLevel = "info" | "warn" | "error" | "debug";
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

type LoggerOptions = {
    logLevel?: LogLevel;
    showTimestamp?: boolean;
    colorize?: boolean;
};

const defaultOptions: LoggerOptions = {
    logLevel: "info",
    showTimestamp: true,
    colorize: true,
};

const getTimestamp = () => new Date().toISOString();

export function createLogger(options: LoggerOptions = {}) {
    const config = { ...defaultOptions, ...options };

    const colorizeMethod = (method: HTTPMethod) => {
        if (!config.colorize) return method;
        switch (method) {
            case "GET":
                return chalk.green(method);
            case "POST":
                return chalk.blue(method);
            case "PUT":
                return chalk.yellow(method);
            case "DELETE":
                return chalk.red(method);
            case "PATCH":
                return chalk.magenta(method);
            case "HEAD":
                return chalk.cyan(method);
            case "OPTIONS":
                return chalk.gray(method);
            default:
                return method;
        }
    };

    const colorizeStatus = (status: number) => {
        if (!config.colorize) return status.toString();
        if (status >= StatusCodes.INTERNAL_SERVER_ERROR) return chalk.red(status);
        if (status >= StatusCodes.BAD_REQUEST) return chalk.yellow(status);
        if (status >= StatusCodes.MOVED_PERMANENTLY) return chalk.cyan(status);
        if (status >= StatusCodes.OK) return chalk.green(status);
        return chalk.gray(status);
    };

    const shouldLog = (level: LogLevel) => {
        const getLevelValue = (lvl: LogLevel): number => {
            switch (lvl) {
                case "error":
                    return 0;
                case "warn":
                    return 1;
                case "info":
                    return 2;
                case "debug":
                    return 3;
                default:
                    return -1;
            }
        };
        return getLevelValue(level) <= getLevelValue(config.logLevel!);
    };

    const log = (level: LogLevel, message: string) => {
        if (!shouldLog(level)) return;
        let logMessage = "";

        if (config.showTimestamp) {
            logMessage += chalk.gray(`[${getTimestamp()}] `);
        }

        switch (level) {
            case "error":
                logMessage += chalk.red.bold("[ERROR] ") + message;
                break;
            case "warn":
                logMessage += chalk.yellow.bold("[WARN] ") + message;
                break;
            case "debug":
                logMessage += chalk.blue.bold("[DEBUG] ") + message;
                break;
            default:
                logMessage += chalk.green.bold("[INFO] ") + message;
        }

        // eslint-disable-next-line no-console
        console.log(logMessage);
    };

    // Single middleware: Morgan + Custom Logging
    const middleware = [
        morgan((tokens, req, res) => {
            const status = Number(tokens.status(req, res));
            const logLevel: LogLevel =
                status >= StatusCodes.INTERNAL_SERVER_ERROR
                    ? "error"
                    : status >= StatusCodes.BAD_REQUEST
                      ? "warn"
                      : "info";

            const method = tokens.method(req, res) as HTTPMethod;
            const url = tokens.url(req, res);
            const statusCode = status;
            const responseTime = tokens["response-time"](req, res);

            const methodStr = colorizeMethod(method);
            const statusStr = colorizeStatus(statusCode);
            const durationMsg = config.colorize
                ? chalk.gray(`${responseTime}ms`)
                : `${responseTime}ms`;
            const fullMsg = `${methodStr} ${url} ${statusStr} ${durationMsg}`;

            log(logLevel, fullMsg);
            return null; // skip morgan default console.log
        }),

        (req: Request, res: Response, next: NextFunction) => {
            const start = Date.now();
            res.on("finish", () => {
                const duration = Date.now() - start;
                const method = colorizeMethod(req.method as HTTPMethod);
                const status = colorizeStatus(res.statusCode);
                const url = config.colorize ? chalk.white(req.originalUrl) : req.originalUrl;
                const durationMsg = config.colorize ? chalk.gray(`${duration}ms`) : `${duration}ms`;

                log("info", `${method} ${url} ${status} ${durationMsg}`);
            });
            next();
        },
    ];

    return {
        middleware, // Use this in your app
        info: (message: string) => log("info", message),
        warn: (message: string) => log("warn", message),
        error: (message: string) => log("error", message),
        debug: (message: string) => log("debug", message),
    };
}

export const logger = createLogger();
