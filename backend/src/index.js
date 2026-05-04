// ✅ use this for production 1. Load env FIRST

// if (process.env.NODE_ENV !== 'production') {
//   await import('dotenv/config');
// }

// // use this for local server:
import 'dotenv/config';

// ✅ 4. Safe BigI  nt serialization
BigInt.prototype.toJSON = function () {
  return this.toString();
};

import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import articlesRoutes from './routes/articles.js';
import syncArticles from './jobs/syncJob.js';
import headlinesRouter from './routes/headlines.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import previewRouter from './routes/preview.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Debug env
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

// ✅ CORS
app.use(
  cors({
    origin: ['http://localhost:5173', process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Preview router — before other routes
app.use('/api-preview', previewRouter);

// ✅ Routes
app.use('/api/articles', articlesRoutes);
app.use('/api/headlines', headlinesRouter);
app.use('/api/admin', adminRoutes);

// ✅ Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ✅ Sample endpoint
app.get('/api/news', (_req, res) => {
  res.json({ message: 'News endpoint ready', articles: [] });
});

// ✅ APM test endpoint
app.get('/apm-test', (_req, res) => {
  console.log('APM TEST HIT');
  res.send('APM test working');
});

// ✅ Swagger — always available in dev
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Swagger JSON route
app.get('/api-docs.json', (_req, res) => {
  res.json(swaggerSpec);
});

// ✅ Cron job
syncArticles();

// ✅ Error handler
app.use(errorHandler);

// ✅ Start server
app.listen(PORT, () => {
  console.log('\n----------------------------------------');
  console.log('🚀 Backend running at:\n');
  console.log(`➜ API:          http://localhost:${PORT}`);
  console.log(`➜ Swagger UI:   http://localhost:${PORT}/api-docs`);
  console.log(`➜ Swagger JSON: http://localhost:${PORT}/api-docs.json`);
  console.log('----------------------------------------\n');
});

export default app;
