import { Schema } from "mongoose";
import mongoose from "mongoose";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Board=mongoose.model("Board", boardSchema);

export default Board