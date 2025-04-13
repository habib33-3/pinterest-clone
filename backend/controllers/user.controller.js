import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Follow from "../models/follow.model.js";

/**
 * Gets a user by their username.
 * @param {Object} req - The request object.
 * @param {string} req.params.username - The username of the user to get.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select("-hashedPassword")
      .lean();

    if (!user) {
      return res.status(404).send("User not found");
    }

    const followerCount = await Follow.countDocuments({ following: user._id });
    const followingCount = await Follow.countDocuments({ follower: user._id });

    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).send({
        ...user,
        followerCount,
        followingCount,
        isFollowing: false,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid token");
      }

      const isExists = await Follow.exists({
        follower: decoded.userId,
        following: user._id,
      });

      res.status(200).send({
        ...user,
        followerCount,
        followingCount,
        isFollowing: !!isExists,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

/**
 * Registers a new user with the provided details.
 * @param {Object} req - The request object.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.email - The email of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {string} req.body.displayName - The display name of the new user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logout successful");
};

export const followUser = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) return res.status(400).send("Username is required");

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isFollowing = await Follow.findOne({
      follower: req.userId,
      following: user._id,
    });

    if (isFollowing) {
      await Follow.findOneAndDelete({
        follower: req.userId,
        following: user._id,
      });
      return res.status(200).send("Unfollowed successfully");
    } else {
      await Follow.create({
        follower: req.userId,
        following: user._id,
      });
      return res.status(200).send("Followed successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
