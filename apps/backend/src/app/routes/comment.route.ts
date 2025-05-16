import { Router } from "express";

import { postCommentSchema } from "@/validations/comment.validation";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth.middleware";

import { getAllCommentsHandler, postCommentHandler } from "@/controllers/comment.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(postCommentSchema), postCommentHandler);

router.get("/:pinId", getAllCommentsHandler);

export const commentRouter = router;
