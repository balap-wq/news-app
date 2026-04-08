import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import articlesRoutes from './routes/articles.js';
import headlinesRoutes from './routes/headlines.js';
import logger from './config/logger.js';


const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
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