import "dotenv/config";
import express from "express";
import { articlesRoutes } from "./routes/articles.js";
import logger from "./config/logger.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/articles", articlesRoutes);

app.use((err, req, res, next) => {
  logger.error("Global Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;
