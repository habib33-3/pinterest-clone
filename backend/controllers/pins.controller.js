import sharp from "sharp";
import Pin from "../models/pins.model.js";

import mongoose from "mongoose";
import ImageKit from "imagekit";
import Like from "../models/like.model.js";
import jwt from "jsonwebtoken";
import Save from "../models/save.model.js";

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const search = req.query.search || "";
  const userId = req.query.userId;
  const boardId = req.query.boardId;

  const LIMIT = 21;

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { tags: { $in: [search] } },
    ];
  } else if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    query.user = userId;
  } else if (boardId && mongoose.Types.ObjectId.isValid(boardId)) {
    query.board = boardId;
  }

  try {
    const pins = await Pin.find(query)
      .limit(LIMIT)
      .skip(LIMIT * pageNumber);

    const hasNextPage = pins.length === LIMIT;

    res.status(200).send({
      pins,
      nextCursor: hasNextPage ? pageNumber + 1 : null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPin = async (req, res) => {
  const { id } = req.params;
  const pin = await Pin.findById(id).populate(
    "user",
    "username img displayName"
  );

  res.status(200).send(pin);
};

export const createPin = async (req, res) => {
  const { title, description, link, board, textOptions, canvasOptions, tags } =
    req.body;

  const media = req.files.media;

  // if (!title || !description ) {
  //   return res.status(400).send("Missing required fields");
  // }

  const parsedTextOptions = JSON.parse(textOptions || "{}");
  const parsedCanvasOptions = JSON.parse(canvasOptions || "{}");

  const metadata = await sharp(media.data).metadata();

  const originalOrientation =
    metadata.width > metadata.height ? "landscape" : "portrait";

  const originalAspectRatio = metadata.width / metadata.height;

  let clientAspectRatio;
  let width;
  let height;

  if (parsedCanvasOptions.size !== "original") {
    clientAspectRatio =
      parsedCanvasOptions.size.split(":")[0] /
      parsedCanvasOptions.size.split(":")[1];
  } else {
    parsedCanvasOptions.orientation === originalOrientation
      ? (clientAspectRatio = originalAspectRatio)
      : (clientAspectRatio = 1 / originalAspectRatio);
  }

  width = metadata.width;
  height = metadata.width / clientAspectRatio;

  const imageKit = new ImageKit({
    privateKey: process.env.IK_PRIVATE_KEY,
    publicKey: process.env.IK_PUBLIC_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
  });

  const textLeftPosition = Math.round((parsedTextOptions.left * width) / 375);
  const textTopPosition = Math.round(
    (parsedTextOptions.top * height) / parsedCanvasOptions.height
  );

  const transformationString = `w-${width},h-${height}${
    originalAspectRatio > clientAspectRatio ? ",cm-pad_resize" : ""
  },bg-${parsedCanvasOptions.backgroundColor.substring(1)}${
    parsedTextOptions.text
      ? `,l-text,i-${parsedTextOptions.text},fs-${
          parsedTextOptions.fontSize * 2.1
        },lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color.substring(
          1
        )},l-end`
      : ""
  }`;

  imageKit
    .upload({
      file: media.data,
      fileName: media.name,
      folder: "pins",
      transformation: {
        pre: transformationString,
      },
    })
    .then(async (response) => {
      const pin = await Pin.create({
        user: req.userId,
        title,
        description,
        link: link || null,
        board: board || null,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        media: response.filePath,
        width: response.width,
        height: response.height,
      });

      return res.status(201).send(pin);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send(error);
    });
};

export const interactionCheck = async (req, res) => {
  const { id } = req.params;

  const token = req.cookies?.token;

  const likeCount = await Like.countDocuments({ pin: id });

  if (!token) {
    return res.status(200).send({ likeCount, isLiked: false, isSaved: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(200)
        .send({ likeCount, isLiked: false, isSaved: false });
    }

    const userId = decoded.userId;

    const isLiked = await Like.findOne({ pin: id, user: userId });
    const isSaved = await Save.findOne({ pin: id, user: userId });

    return res.status(200).send({
      likeCount,
      isLiked: isLiked !== null,
      isSaved: isSaved !== null,
    });
  });
};

export const interact = async (req, res) => {
  const { id } = req.params;

  const { type } = req.body;

  

  if (type === "like") {
    const isLiked = await Like.findOne({ pin: id, user: req.userId });

    if (isLiked) {
      await Like.findOneAndDelete({ pin: id, user: req.userId });
      return res.status(200).send("Unliked successfully");
    } else {
      await Like.create({ pin: id, user: req.userId });
      return res.status(200).send("Liked successfully");
    }
  } else if (type === "save") {
    const isSaved = await Save.findOne({ pin: id, user: req.userId });

    if (isSaved) {
      await Save.findOneAndDelete({ pin: id, user: req.userId });
      return res.status(200).send("Unsaved successfully");
    } else {
      await Save.create({ pin: id, user: req.userId });
      return res.status(200).send("Saved successfully");
    }
  }
};
