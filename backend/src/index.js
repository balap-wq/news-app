import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';
import adminRoutes from './routes/adminRoutes.js';
import { articlesRoutes } from './routes/articles.js';
import syncArticles from './jobs/syncJob.js';
import headlinesRouter from './routes/headlines.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';


const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);

app.use(express.json());

app.use('/api/articles', articlesRoutes);

// ✅ Headlines route for fetching new headlines;
app.use('/api/headlines', headlinesRouter);


// ✅ Health check

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Checks the health of the API.
 *     responses:
 *       200:
 *         description: API is healthy
 */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ✅ Sample endpoint
app.get('/api/news', (_req, res) => {
  res.json({ message: 'News endpoint ready', articles: [] });
});

app.use('/api/admin', adminRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

syncArticles();

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;
