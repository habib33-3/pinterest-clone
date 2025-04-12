// utils/connectDb.js
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    throw error; // propagate the error so the server won't start
  }
};
