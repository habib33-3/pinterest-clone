import { Router } from "express";

import { getPinsLikeCountSchema, likePinSchema } from "@/validations/like.validation";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth.middleware";

import { getLikesCountHandler, likePinHandler } from "@/controllers/like.controllers";

const router = Router();

router.post("/pin/:pinId", verifyAuth, validationMiddleware(likePinSchema), likePinHandler);

router.get("/pin/:pinId", validationMiddleware(getPinsLikeCountSchema), getLikesCountHandler);

export const likeRouter = router;
