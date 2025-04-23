import type {
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";

import type { ApiResponse } from "@/types";

export const formatPrismaMeta = (meta: unknown): string => {
    if (!meta || typeof meta !== "object") return "";
    return Object.entries(meta)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
};

export const handlePrismaValidationError = (
    err: PrismaClientValidationError,
    myResponseObj: ApiResponse<null>
) => {
    myResponseObj.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    myResponseObj.message = err.message.replaceAll("\n", " ");
};

// Handle Prisma known request errors
export const handlePrismaKnownRequestError = (
    err: PrismaClientKnownRequestError,
    myResponseObj: ApiResponse<null>
) => {
    myResponseObj.statusCode = StatusCodes.BAD_REQUEST;

    switch (err.code) {
        case "P2002":
            myResponseObj.message =
                "Unique constraint failed on the field(s): " + formatPrismaMeta(err.meta ?? {});
            break;
        case "P2003":
            myResponseObj.message =
                "Foreign key constraint failed on the field(s): " +
                formatPrismaMeta(err.meta ?? {});
            break;
        case "P2025":
            myResponseObj.message = "An operation failed because a required record was not found.";
            break;
        default:
            myResponseObj.message = err.message;
            break;
    }
};
