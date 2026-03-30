import 'dotenv/config';
import express from 'express';
import { articlesRoutes } from './routes/articles.js';
import logger from './config/logger.js';

const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use('/api/articles', articlesRoutes);

// ✅ 404 handler (VERY IMPORTANT)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Global Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;
