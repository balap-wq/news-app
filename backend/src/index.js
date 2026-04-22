BigInt.prototype.toJSON = function () {
  return this.toString();
};

import './config/env.js';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';
import adminRoutes from './routes/adminRoutes.js';
import articlesRoutes from './routes/articles.js';
import syncArticles from './jobs/syncJob.js';
import headlinesRouter from './routes/headlines.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import { testConnection } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// ✅ 3. TEST DATABASE CONNECTION
await testConnection();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ DEBUG (very important)
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

// ✅ CORS FIX (safe + production ready)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use('/api/articles', articlesRoutes);
app.use('/api/headlines', headlinesRouter);
app.use('/api/admin', adminRoutes);

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

// ✅ 7. HEALTH CHECK
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
  // ✅ Health check
});

// ✅ Sample endpoint
app.get('/api/news', (_req, res) => {
  res.json({ message: 'News endpoint ready', articles: [] });
});

// ✅ 9. SWAGGER (ONLY IN PRODUCTION)
if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// ✅ Cron job
syncArticles();

// ✅ Error handler (ALWAYS last)
app.use(errorHandler);

// ✅ Start server
app.listen(PORT, () => {
  logger.info(`Server running on port${PORT}`);
});

export default app;
