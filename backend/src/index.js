import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';
import  startSyncJob  from './jobs/syncJob.js';
import adminRoutes from './routes/adminRoutes.js';
import { articlesRoutes } from "./routes/articles.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);

app.use(express.json());

app.use("/api/articles", articlesRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/news', (_req, res) => {
  res.json({ message: 'News endpoint ready', articles: [] });
});



app.use('/api/admin', adminRoutes);

startSyncJob();

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;
