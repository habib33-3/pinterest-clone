import Pin from "../models/pins.model.js";

import mongoose from "mongoose";


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
