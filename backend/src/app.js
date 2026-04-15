import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { articlesRoutes } from './routes/articles.js';
import logger from './config/logger.js';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/articles', articlesRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
  });
});

app.use((err, req, res, _next) => {
  logger.error('Global Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});


export default app;