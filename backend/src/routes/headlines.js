import express from 'express';
import { getHeadlines } from '../controllers/headlinesController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { headlineQuerySchema } from '../schemas/articleSchema.js';

const router = express.Router();

/**
 * @swagger
 * /api/headlines:
 *  get:
 *   summary: Get latest headlines
 *   description: Fetches the latest news headlines from the database.
 *   responses:
 *     200:
 *       description: A list of news headlines
 */
await new Promise((res) => setTimeout(res, 2000));

router.get('/', getHeadlines);
router.get(
  '/',
  validateRequest({ schema: headlineQuerySchema }), // ✅ schema not query
  getHeadlines
);

export default router;
