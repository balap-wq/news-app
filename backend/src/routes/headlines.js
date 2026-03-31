import express from 'express';
import { getHeadlines } from '../controllers/headlinesController.js';

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

router.get('/', getHeadlines);

export default router;
