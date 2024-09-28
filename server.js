import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 6000;
app.listen(port, (req, res) => {
  console.log(`Server running at port no ${port}`);
  connectDB();
});
