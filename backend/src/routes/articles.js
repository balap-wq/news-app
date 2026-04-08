import express from 'express';
import { getArticleById, getHeadlines } from '../controllers/articlesController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { articleParamSchema } from '../schemas/articleSchema.js';

const router = express.Router();

// GET all articles (headlines)
router.get('/', getHeadlines);

// GET article by ID
router.get(
  '/:id',
  validateRequest({ schema: articleParamSchema }),
  getArticleById
);

export default router;