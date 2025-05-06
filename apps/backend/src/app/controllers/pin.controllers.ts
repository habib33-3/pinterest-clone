import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import ApiError from "@/shared/ApiError";
import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { CreatePinType } from "@/validations/pin.validation";

import { createPinService } from "@/services/pin.services";

export const createPinHandler = asyncHandler(async (req: Request<{}, {}, CreatePinType>, res) => {
    if (!req.file) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No file uploaded");
    }

    const result = await createPinService(req.body, req.file, req.user?.id as string);

    sendResponse(req, res, {
        message: "Pin uploaded successfully",
        data: result,
        statusCode: StatusCodes.CREATED,
    });
});
