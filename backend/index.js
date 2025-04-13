// server.js
import express from "express";
import userRouter from "./routes/user.route.js";
import { connectDb } from "./utils/connectDb.js";
import dotenv from "dotenv";
import cors from "cors";
import pinRouter from "./routes/pins.route.js";
import boardRouter from "./routes/board.routes.js";
import commentRouter from "./routes/comments.routes.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/user", userRouter);

app.use("/pins", pinRouter);

app.use("/boards", boardRouter);

app.use("/comments", commentRouter);

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
