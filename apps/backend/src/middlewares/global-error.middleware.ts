import type { NextFunction, Request, Response } from "express";

import {
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import ApiError from "@/shared/ApiError";
import { logger } from "@/shared/logger";
import sendResponse from "@/shared/sendResponse";

import { handleGenericError } from "@/errors/genericError";
import { handlePrismaKnownRequestError, handlePrismaValidationError } from "@/errors/prismaError";
import { handleZodError } from "@/errors/zodError";
import type { ApiResponse } from "@/types";

const handleException = (err: unknown, myResponseObj: ApiResponse<null>) => {
    if (err instanceof PrismaClientValidationError) {
        handlePrismaValidationError(err, myResponseObj);
    } else if (err instanceof PrismaClientKnownRequestError) {
        handlePrismaKnownRequestError(err, myResponseObj);
    } else if (err instanceof ZodError) {
        handleZodError(err, myResponseObj);
    } else if (err instanceof ApiError) {
        myResponseObj.statusCode = err.statusCode;
        myResponseObj.message = err.message;
    } else if (err instanceof Error) {
        handleGenericError(err, myResponseObj);
    } else {
        handleGenericError(new Error("Unknown Error"), myResponseObj);
    }
};

const globalErrorMiddleware = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
    const response: ApiResponse<null> = {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
        data: null,
    };

    // Handle specific errors
    handleException(err, response);

    // Send the response to the client
    sendResponse(req, res, response);

    // Log the error for debugging
    logger.error(response.message || "Something went wrong");
};

export default globalErrorMiddleware;
