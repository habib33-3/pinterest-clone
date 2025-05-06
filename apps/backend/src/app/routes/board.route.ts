import { Router } from "express";

import verifyAuth from "@/middlewares/verifyAuth.middleware";

import { getAllBoardHandler } from "@/controllers/board.controllers";

const router = Router();

router.get("/", verifyAuth, getAllBoardHandler);

export const boardRouter = router;
