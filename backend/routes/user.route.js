import { Router } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { getUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/create", async (req, res) => {
  const user = req.body;

  user.hashedPassword = await bcrypt.hash(user.hashedPassword, 10);

  await User.create({
    displayName: user.displayName,
    username: user.username,
    email: user.email,
    img: user.img,
    hashedPassword: user.hashedPassword,
  });

  res.send(user);
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:username", getUser);

export default router;
