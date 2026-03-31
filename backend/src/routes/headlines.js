import express from 'express';
import { getHeadlines } from '../controllers/headlinesController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { headlineQuerySchema } from '../schemas/articleSchema.js';

const router = express.Router();

// GET /api/headlines
router.get(
  '/',
  validateRequest({ query: headlineQuerySchema }),
  getHeadlines
);

export default router;
