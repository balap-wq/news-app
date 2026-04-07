import 'dotenv/config';
import express from 'express';
import { articlesRoutes } from './routes/articles.js';
import { headlinesRoutes } from './routes/headlines.js';
import logger from './config/logger.js';

const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/articles', articlesRoutes);
app.use('/api/headlines', headlinesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, _next) => {
  logger.error('Global Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;