import type { Request, Response } from "express";

import type { ApiResponse } from "@/types";

const sendResponse = <T>(req: Request, res: Response, payload: ApiResponse<T>): Response => {
    const { statusCode, success, message, meta, data } = payload;

    return res.status(statusCode).json({
        statusCode,
        success,
        message: message ?? null,
        path: req.originalUrl,
        meta: meta ?? null,
        data: data ?? null,
        timestamp: new Date().toISOString(), // Useful for tracing
    });
};

export default sendResponse;
