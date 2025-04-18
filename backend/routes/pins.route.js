import { Router } from "express";
import {
  createPin,
  getPin,
  getPins,
  interact,
  interactionCheck,
} from "../controllers/pins.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getPins);

router.post("/", authMiddleware, createPin);

router.get("/interaction-check/:id", interactionCheck);

router.get("/:id", getPin);

router.post("/interact/:id", authMiddleware, interact);

export default router;
