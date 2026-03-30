import express from 'express';
import { getArticleById, getHeadlines } from '../controllers/articlesController.js';

const router = express.Router();

router.get("/", getHeadlines);
router.get('/:id', getArticleById);

export { router as articlesRoutes };
