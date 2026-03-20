import express from "express";
import { getArticleById } from "../controllers/articlesController.js";

const router = express.Router();


router.get("/api/articles/:id", getArticleById);

export default router;