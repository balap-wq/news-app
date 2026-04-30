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
  validateRequest({ params: articleParamSchema }), // ✅ FIXED: schema → params
  getArticleById
);

// 🔹 CREATE article
router.post(
  '/',
  validateRequest({ body: articleBodySchema }), // ✅ FIXED: schema → body
  createArticle
);

// 🔹 UPDATE article
router.put(
  '/:id',
  validateRequest({ body: articleBodySchema.partial() }), // ✅ FIXED: schema → body
  updateArticle
);

// 🔹 DELETE article
router.delete(
  '/:id',
  validateRequest({ params: articleParamSchema }), // ✅ FIXED: schema → params
  deleteArticle
);

export default router;
