import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import ApiError from "@/shared/ApiError";
import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type {
    CreatePinType,
    GetSinglePinByIdType,
    SavePinToNewBoardType,
    SavePinType,
} from "@/validations/pin.validation";

import {
    createPinService,
    getAllPinsService,
    getSinglePinByIdService,
    savePinService,
    savePinToNewBoardService,
} from "@/services/pin.services";

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

export const getAllPinsHandler = asyncHandler(async (req, res) => {
    const { search } = req.query as { search: string };

    const result = await getAllPinsService(search);

    sendResponse(req, res, {
        message: "Pins fetched successfully",
        data: result,
    });
});

export const getSinglePinByIdHandler = asyncHandler(
    async (req: Request<GetSinglePinByIdType>, res) => {
        const { pinId } = req.params;

        const result = await getSinglePinByIdService(pinId);

        sendResponse(req, res, {
            message: "Pin fetched successfully",
            data: result,
        });
    }
);

export const savePinHandler = asyncHandler(async (req: Request<{}, {}, SavePinType>, res) => {
    const id = req.user?.id as string;

    const result = await savePinService(req.body, id);

    sendResponse(req, res, {
        message: "Pin saved successfully",
        data: result,
    });
});

export const savePinToNewBoardHandler = asyncHandler(
    async (req: Request<{}, {}, SavePinToNewBoardType>, res) => {
        const userId = req.user?.id as string;

        const result = await savePinToNewBoardService(req.body, userId);

        sendResponse(req, res, {
            message: "Pin saved successfully",
            data: result,
        });
    }
);
