import express from "express";
import { getArticleById } from "../controllers/articlesController.js";

const router = express.Router();

router.get("/:id", getArticleById);

export { router as articlesRoutes };