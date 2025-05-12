import { Router } from "express";

import { followUserSchema } from "@/validations/follower.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth.middleware";

import { followUserHandler, getFollowerUserHandlers } from "@/controllers/follow.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(followUserSchema), followUserHandler);

router.get("/:followerUsername", getFollowerUserHandlers);

export const followRouter = router;
