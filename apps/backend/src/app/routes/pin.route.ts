import { Router } from "express";

import { createPinSchema, getSinglePinByIdSchema } from "@/validations/pin.validation";

import uploadImage from "@/middlewares/uploadImage.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth.middleware";

import {
    createPinHandler,
    getAllPinsHandler,
    getSinglePinByIdHandler,
} from "@/controllers/pin.controllers";

const router = Router();

router.post(
    "/",
    verifyAuth,
    uploadImage.single("image"),
    validationMiddleware(createPinSchema),
    createPinHandler
);

router.get("/:pinId", validationMiddleware(getSinglePinByIdSchema), getSinglePinByIdHandler);

router.get("/", getAllPinsHandler);

export const pinRouter = router;
