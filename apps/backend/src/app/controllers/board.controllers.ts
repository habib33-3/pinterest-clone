import type { Request } from "express";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { RemovePinFromBoardType } from "@/validations/board.validation";

import {
    getAllBoardsService,
    getSavedBoardService,
    removePinFromBoardService,
} from "@/services/board.services";

export const getAllBoardHandler = asyncHandler(
    async (req: Request<{}, {}, {}, { searchQuery: string }>, res) => {
        const { searchQuery } = req.query;

        const boards = await getAllBoardsService(req.user?.id as string, searchQuery);

        sendResponse(req, res, {
            message: "Boards fetched successfully",
            data: boards,
        });
    }
);

export const getSavedBoardHandler = asyncHandler(async (req: Request<{ pinId: string }>, res) => {
    const { pinId } = req.params;

    const userId = req.user?.id;

    const result = await getSavedBoardService(userId as string, pinId);

    sendResponse(req, res, {
        message: "Board fetched successfully",
        data: result,
    });
});

export const removePinFromBoardHandler = asyncHandler(
    async (req: Request<RemovePinFromBoardType>, res) => {
        const { boardId, pinId } = req.params;

        const result = await removePinFromBoardService({ boardId, pinId }, req.user?.id as string);

        sendResponse(req, res, {
            message: result.message,
            data: result,
        });
    }
);
