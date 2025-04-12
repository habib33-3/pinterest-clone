// server.js
import express from "express";
import userRouter from "./routes/user.route.js";
import { connectDb } from "./utils/connectDb.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json())

app.use("/user", userRouter);

const startServer = async () => {
  try {
    await connectDb(); 
    app.listen(3000, () => {
      console.log("Server is running on port 3000 🚀");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
