if (process.env.NODE_ENV !== 'production') {
  await import('dotenv/config');
}
import 'dotenv/config';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import adminRoutes from './routes/adminRoutes.js';
import articlesRoutes from './routes/articles.js';
import syncArticles from './jobs/syncJob.js';
import headlinesRouter from './routes/headlines.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import previewRouter from './routes/preview.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import './config/passport.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ['http://localhost:5173', process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'test-secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-preview', previewRouter);
app.use('/auth', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/headlines', headlinesRouter);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/news', (_req, res) => {
  res.json({ message: 'News endpoint ready', articles: [] });
});

app.get('/apm-test', (_req, res) => {
  console.log('APM TEST HIT');
  res.send('APM test working');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-docs.json', (_req, res) => {
  res.json(swaggerSpec);
});

syncArticles();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('\n----------------------------------------');
  console.log('🚀 Backend running at:\n');
  console.log(`➜ API:          http://localhost:${PORT}`);
  console.log(`➜ Swagger UI:   http://localhost:${PORT}/api-docs`);
  console.log(`➜ Swagger JSON: http://localhost:${PORT}/api-docs.json`);
  console.log('----------------------------------------\n');
});

export default app;
