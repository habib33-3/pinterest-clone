import { Router } from "express";

import uploadImage from "@/middlewares/uploadImage.middleware";

import { createPinHandler } from "@/controllers/pin.controllers";

const router = Router();

router.post("/", uploadImage.single("image"), createPinHandler);

export const pinRouter = router;
