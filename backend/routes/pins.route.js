import { Router } from "express";
import { createPin, getPin, getPins } from "../controllers/pins.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getPins);

router.get("/:id", getPin);

router.post("/", authMiddleware, createPin);

export default router;
