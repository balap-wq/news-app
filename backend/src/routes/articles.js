import express from 'express';
import { getArticleById } from '../controllers/articlesController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { articleParamSchema } from '../schemas/articleSchema.js';

const router = express.Router();

// GET /api/articles/:id
router.get(
  '/:id',
  validateRequest({ params: articleParamSchema }),
  getArticleById
);

export { router as articlesRoutes };
