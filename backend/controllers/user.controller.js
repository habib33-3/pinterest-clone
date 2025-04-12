import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

/**
 * Gets a user by their username.
 * @param {Object} req - The request object.
 * @param {string} req.params.username - The username of the user to get.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const getUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({
    username,
  }).select("-hashedPassword");

  res.status(200).send(user);
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;

    if (!username || !email || !password || !displayName) {
      return res.status(400).send("Missing required fields");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      displayName,
      hashedPassword,
    });

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordValid) {
    return res.status(401).send("Invalid credentials");
  }

  res.status(200).send(user);
};
