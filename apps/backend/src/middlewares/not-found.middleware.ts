import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import sendResponse from "@/shared/sendResponse";

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    sendResponse(req, res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "Route not found",
        data: null,
    });

    next();
};

export default notFoundMiddleware;
