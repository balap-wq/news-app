import express from 'express';
import { getArticleById, getHeadlines } from '../controllers/articlesController.js';
import { validate } from '../middleware/validate.js';
import { articleIdSchema, headlinesQuerySchema } from '../validators/articleValidator.js';

const router = express.Router();

router.get('/:id', validate(articleIdSchema), getArticleById);

router.get('/', validate(headlinesQuerySchema, 'query'), getHeadlines);

export { router as articlesRoutes };
