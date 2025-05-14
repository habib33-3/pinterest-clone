import type {
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";

import { logger } from "@/shared/logger";

import type { ApiResponse } from "@/types";

// Helper function to format meta information for better error handling
export const formatPrismaMeta = (meta: unknown): string => {
    if (!meta || typeof meta !== "object") return "";
    return Object.entries(meta)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
};

// Function to handle Prisma validation errors
export const handlePrismaValidationError = (
    err: PrismaClientValidationError,
    myResponseObj: ApiResponse<null>
) => {
    myResponseObj.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    myResponseObj.message = err.message.replaceAll("\n", " ");
};

// Function to handle Prisma known request errors
export const handlePrismaKnownRequestError = (
    err: PrismaClientKnownRequestError,
    myResponseObj: ApiResponse<null>
) => {
    logger.error(err.message);

    myResponseObj.statusCode = StatusCodes.BAD_REQUEST;

    // Type guarding: Ensure target is a valid string array before using includes
    const target = err.meta?.target;

    if (Array.isArray(target)) {
        switch (err.code) {
            case "P2002": // Unique constraint failed
                // More user-friendly messages for unique constraint violation
                if (target.includes("email")) {
                    myResponseObj.message = "This email is already in use. Please try another.";
                } else if (target.includes("userName")) {
                    myResponseObj.message =
                        "This username is already taken. Please choose another.";
                } else if (target.includes("title")) {
                    myResponseObj.message =
                        "A board with this title already exists. Please use a different title.";
                } else {
                    myResponseObj.message =
                        "A unique constraint failed. Please make sure the data is unique.";
                }
                break;
            case "P2003": // Foreign key constraint failed
                myResponseObj.message = "A related resource was not found. Please check the data.";
                break;
            case "P2025": // Record not found
                myResponseObj.message = "The requested record could not be found.";
                break;
            default:
                myResponseObj.message = err.message;
                break;
        }
    } else {
        myResponseObj.message = "An unknown error occurred.";
    }
};
