import { Router } from "express";
import { getUserBoards } from "../controllers/boards.controller.js";

const router = Router();

router.get("/:userId",getUserBoards)

export default router;
