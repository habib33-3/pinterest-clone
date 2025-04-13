import { Router } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  followUser,
  getUser,
  login,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:username", getUser);

router.post("/auth/register", registerUser);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

router.post("/follow/:username", authMiddleware, followUser);

export default router;
