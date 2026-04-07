import express from 'express';
import { getHeadlines } from '../controllers/headlinesController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { headlineQuerySchema } from '../schemas/articleSchema.js';

const router = express.Router();

router.get(
  '/',
  validateRequest({ schema: headlineQuerySchema }), 
  getHeadlines
);

export { router as headlinesRoutes };