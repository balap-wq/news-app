import express from 'express';
import {
  getHeadlines,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articlesController.js';

import { validateRequest } from '../middleware/validateRequest.js';
import { articleParamSchema, articleBodySchema } from '../schemas/articleSchema.js';

const router = express.Router();

// 🔹 GET all articles
router.get('/', getHeadlines);

// 🔹 GET article by ID
router.get(
  '/:id',
  validateRequest({ schema: articleParamSchema }), // ✅ FIX
  getArticleById
);

// 🔹 CREATE article
router.post(
  '/',
  validateRequest({ schema: articleBodySchema }), // ✅ FIX
  createArticle
);

// 🔹 UPDATE article
router.put(
  '/:id',
  validateRequest({ schema: articleBodySchema.partial() }), // ✅ FIX
  updateArticle
);

// 🔹 DELETE article
router.delete(
  '/:id',
  validateRequest({ schema: articleParamSchema }), // ✅ FIX
  deleteArticle
);

export default router;
