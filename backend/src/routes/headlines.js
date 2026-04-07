import express from 'express';
import { getHeadlines } from '../controllers/headlinesController.js';

const router = express.Router();

// get /api/headlines

router.get('/', getHeadlines);

export { router as headlinesRoutes };
