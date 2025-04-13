import { Router } from "express";
import {
  addComment,
  getPostComments,
} from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:postId", getPostComments);

router.post("/", authMiddleware, addComment);

export default router;
