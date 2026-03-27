import express from "express";
import { getArticleById } from "../controllers/articlesController.js";
import { validate } from "../middleware/validate.js";
import { articleIdSchema } from "../validators/articleValidator.js";

const router = express.Router();

router.get("/:id", validate(articleIdSchema), getArticleById);

export { router as articlesRoutes };