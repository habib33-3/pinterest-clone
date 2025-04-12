import { Router } from "express";
import { getPin, getPins } from "../controllers/pins.controller.js";

const router = Router();

router.get("/", getPins);

router.get("/:id", getPin);

export default router;
