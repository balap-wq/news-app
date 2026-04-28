// ✅ 1. Load env FIRST
import 'dotenv/config';

// ✅ 2. Load New Relic SECOND (VERY IMPORTANT)
import 'newrelic';

// ✅ 4. Safe BigInt serialization
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// ❌ REMOVED: import './config/env.js';

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

// ✅ 5. Test DB connection
await testConnection();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Debug env
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

// ✅ CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// ✅ Sample endpoint
app.get('/api/news', (_req, res) => {
  res.json({ message: 'News endpoint ready', articles: [] });
});

// ✅ APM test endpoint (important for verification)
app.get('/apm-test', (req, res) => {
  console.log('APM TEST HIT');
  res.send('APM test working');
});

// ✅ Swagger (dev only)
if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// ✅ Cron job
syncArticles();

// ✅ Error handler (last)
app.use(errorHandler);

// ✅ Start server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;
