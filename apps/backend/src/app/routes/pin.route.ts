import { Router } from "express";

import { createPinSchema } from "@/validations/pin.validation";

import uploadImage from "@/middlewares/uploadImage.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth.middleware";

import { createPinHandler } from "@/controllers/pin.controllers";

const router = Router();

router.post(
    "/",
    verifyAuth,
    uploadImage.single("image"),
    validationMiddleware(createPinSchema),
    createPinHandler
);

export const pinRouter = router;
