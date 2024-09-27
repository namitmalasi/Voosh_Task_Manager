import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();
dotenv.config();
app.use(cors());

const port = process.env.PORT || 6000;
app.listen(port, (req, res) => {
  console.log(`Server running at port no ${port}`);
  connectDB();
});
