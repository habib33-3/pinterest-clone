import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import { getAllBoardsService } from "@/services/board.services";

export const getAllBoardHandler = asyncHandler(async (req, res) => {
    const boards = await getAllBoardsService(req.user?.id as string);

    sendResponse(req, res, {
        message: "Boards fetched successfully",
        data: boards,
    });
});
