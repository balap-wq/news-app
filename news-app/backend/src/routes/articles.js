import express from 'express';
import { getArticleById } from '../controllers/articlesController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { articleParamSchema } from '../schemas/articleSchema.js';

const router = express.Router();

router.get(
  '/:id',
  validateRequest({ schema: articleParamSchema }), 
  getArticleById
);

export { router as articlesRoutes };