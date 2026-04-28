if (process.env.NODE_ENV !== 'production') {
  await import('dotenv/config');
}
import 'dotenv/config'; // :white_check_mark: MUST be line 1

// :white_check_mark: 4. Safe BigInt serialization
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
// import previewRouter from './routes/preview.js';
import { testConnection } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// :white_check_mark: 4. Test DB connection
await testConnection();

const app = express();
const PORT = process.env.PORT || 8080;

// :white_check_mark: Debug env
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

// :white_check_mark: CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      process.env.FRONTEND_URL, // :white_check_mark: ADD THIS
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json());

// :white_check_mark: Routes
app.use('/api/articles', articlesRoutes);
app.use('/api/headlines', headlinesRouter);
app.use('/api/admin', adminRoutes);
// app.use('/api-preview', previewRouter);

// :white_check_mark: Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// :white_check_mark: Sample endpoint
app.get('/api/news', (_req, res) => {
  res.json({ message: 'News endpoint ready', articles: [] });
});

// :white_check_mark: APM test endpoint
app.get('/apm-test', (_req, res) => {
  console.log('APM TEST HIT');
  res.send('APM test working');
});

// :white_check_mark: Swagger (dev only)
if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// :white_check_mark: Swagger JSON route (IMPORTANT for ticket)
app.get('/api-docs.json', (_req, res) => {
  res.json(swaggerSpec);
});

// :white_check_mark: Cron job
syncArticles();

// :white_check_mark: Error handler
app.use(errorHandler);

// :white_check_mark: Start server (Vite-style output)
app.listen(PORT, () => {
  console.log('\n----------------------------------------');
  console.log(':rocket: Backend running at:\n');
  console.log(`➜ API:http://localhost:${PORT}`);
  console.log(`➜ Swagger UI:http://localhost:${PORT}/api-docs`);
  console.log(`➜ Swagger JSON: http://localhost:${PORT}/api-docs.json`);
  console.log('----------------------------------------\n');
});

export default app;
