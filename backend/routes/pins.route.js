import { Router } from "express";
import { getPins } from "../controllers/pins.controller.js";

const router=Router()


router.get("/",getPins)

export default router