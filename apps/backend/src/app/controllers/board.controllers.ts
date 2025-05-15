import type { Request } from "express";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import { getAllBoardsService } from "@/services/board.services";

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
