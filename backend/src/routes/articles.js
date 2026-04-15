import express from 'express';
import { getArticleById, getHeadlines } from '../controllers/articlesController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { articleParamSchema } from '../schemas/articleSchema.js';

const router = express.Router();

// GET all articles (headlines)
router.get('/', getHeadlines);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     description: Fetches a news article by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A news article object
 *       404:
 *         description: Article not found
 */

// GET article by ID
router.get(
  '/:id',
  validateRequest({ schema: articleParamSchema }),
  getArticleById
);

export default router;