import type { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import type { ApiResponse } from "@/types";

const sendResponse = <T>(req: Request, res: Response, payload: ApiResponse<T>): Response => {
    const finalStatusCode = payload.statusCode || StatusCodes.OK;

    return res.status(finalStatusCode).json({
        statusCode: finalStatusCode,
        success: payload.success ?? true,
        message: payload.message ?? null,
        path: req.originalUrl,
        meta: payload.meta ?? null,
        data: payload.data ?? null,
        timestamp: new Date().toISOString(),
    });
};

export default sendResponse;
