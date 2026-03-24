import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getArticleById } from '../controllers/articlesController';
import logger from './config/logger.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);

app.use(express.json());

app.get("/api/articles/:id", getArticleById);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/news', (_req, res) => {
  res.json({ message: 'News endpoint ready', articles: [] });
});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;
