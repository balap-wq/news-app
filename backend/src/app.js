import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session'; // ← NEW
import passport from 'passport'; // ← NEW

import articlesRoutes from './routes/articles.js';
import headlinesRoutes from './routes/headlines.js';
import previewRouter from './routes/preview.js';
import authRoutes from './routes/auth.js'; // ← NEW
import logger from './config/logger.js';
import './config/passport.js'; // ← NEW — register Google strategy

const app = express();

// ✅ Preview router BEFORE cors — unchanged, stays here
app.use('/api-preview', previewRouter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

// ← NEW — session needed by passport during OAuth handshake
// Must come AFTER cors, BEFORE passport.initialize()
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// ← NEW — initialize passport after session
app.use(passport.initialize());
app.use(passport.session());

// Health check — unchanged
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// ← NEW auth routes: /auth/google, /auth/google/callback
app.use('/auth', authRoutes);

// Your existing routes — unchanged
app.use('/api/articles', articlesRoutes);
app.use('/api/headlines', headlinesRoutes);

// 404 handler — unchanged
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler — unchanged
app.use((err, req, res, _next) => {
  logger.error('Global Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;
