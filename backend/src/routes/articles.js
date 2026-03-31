import express from 'express';
import { getArticleById } from '../controllers/articlesController.js';

const router = express.Router();

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

router.get('/:id', getArticleById);

export { router as articlesRoutes };
