import { Router } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  getUser,
  login,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:username", getUser);

router.post("/auth/register", registerUser);
router.post("/auth/login", login);

export default router;
