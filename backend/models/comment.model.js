import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    pin: {
      type: Schema.Types.ObjectId,
      ref: "Pin",
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

const Comment = mongoose.model("Comment", commentSchema);

export default Comment