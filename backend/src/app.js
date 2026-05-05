import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import userRoutes from './routes/userRoutes.js';
import articlesRoutes from './routes/articles.js';
import headlinesRoutes from './routes/headlines.js';
import previewRouter from './routes/preview.js';
import authRoutes from './routes/auth.js';
import logger from './config/logger.js';
import './config/passport.js';

const app = express();

app.use('/api-preview', previewRouter);
app.use('/api/users', userRoutes);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

// ✅ Session middleware - ONLY ONCE
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'test-secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/auth', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/headlines', headlinesRoutes);

// ✅ 404 handler - BEFORE global error handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Global error handler - SINGLE handler with correct message
app.use((err, req, res, _next) => {
  logger.error('Global Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
