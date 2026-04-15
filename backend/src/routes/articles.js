import express from 'express';
import {
  getHeadlines,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/articlesController.js';

import { validateRequest } from '../middleware/validateRequest.js';
import { articleParamSchema } from '../schemas/articleSchema.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: News Articles API
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     description: Fetch all news articles with optional pagination.
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of articles
 */
router.get('/', getHeadlines);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     description: Fetch a single article using its ID.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article found
 *       404:
 *         description: Article not found
 */
router.get(
  '/:id',
  validateRequest({ schema: articleParamSchema }),
  validateRequest({ schema: articleParamSchema }),
  getArticleById
);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     description: Add a new article manually.
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               url:
 *                 type: string
 *               urlToImage:
 *                 type: string
 *               source:
 *                 type: string
 *               category:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created successfully
 */
router.post('/', createArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Update an article
 *     description: Update an existing article by ID.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               url:
 *                 type: string
 *               urlToImage:
 *                 type: string
 *               source:
 *                 type: string
 *               category:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       404:
 *         description: Article not found
 */
router.put(
  '/:id',
  validateRequest({ schema: articleParamSchema }),
  updateArticle
);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     description: Remove an article by ID.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */
router.delete(
  '/:id',
  validateRequest({ schema: articleParamSchema }),
  deleteArticle
);

export { router as articlesRoutes };