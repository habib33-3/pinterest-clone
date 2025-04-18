import { Schema } from "mongoose";
import mongoose from "mongoose";

const saveSchema = new Schema(
  {
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

const Save = mongoose.model("Save", saveSchema);

export default Save;
