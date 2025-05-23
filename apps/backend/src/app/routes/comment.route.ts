import { Router } from "express";

import { postCommentSchema, updateCommentSchema } from "@/validations/comment.validation";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth.middleware";

import {
    deleteCommentHandler,
    getAllCommentsHandler,
    postCommentHandler,
    updateCommentHandler,
} from "@/controllers/comment.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(postCommentSchema), postCommentHandler);

router.get("/:pinId", getAllCommentsHandler);

router.patch(
    "/:commentId",
    verifyAuth,
    validationMiddleware(updateCommentSchema),
    updateCommentHandler
);

router.delete("/:commentId", verifyAuth, deleteCommentHandler);

export const commentRouter = router;
