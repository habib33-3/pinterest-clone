import { Router } from "express";

import verifyAuth from "@/middlewares/verifyAuth.middleware";

import {
    getAllBoardHandler,
    getSavedBoardHandler,
    removePinFromBoardHandler,
} from "@/controllers/board.controllers";

const router = Router();

router.get("/", verifyAuth, getAllBoardHandler);

router.get("/saved/:pinId", verifyAuth, getSavedBoardHandler);

router.delete("/:boardId/pin/:pinId", verifyAuth, removePinFromBoardHandler);

export const boardRouter = router;
