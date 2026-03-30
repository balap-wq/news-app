import express from "express";

import { getArticleById } from "../controllers/articlesController.js";
import { getHeadlines } from "../controllers/headlineController.js";

import { validate } from "../middleware/validate.js";
import {
  articleIdSchema,
  headlinesQuerySchema,
} from "../validators/articleValidator.js";

const router = express.Router();

router.get("/:id", validate(articleIdSchema, "params"), getArticleById);

router.get("/", validate(headlinesQuerySchema, "query"), getHeadlines);

export default router;