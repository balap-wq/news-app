import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import verifyToken from './middleware/verifyToken.js';
import userRoutes from './routes/userRoutes.js';
import articlesRoutes from './routes/articles.js';
import headlinesRoutes from './routes/headlines.js';
import previewRouter from './routes/preview.js';
import authRoutes from './routes/auth.js';
import logger from './config/logger.js';
import './config/passport.js';

const app = express();

app.use('/api-preview', previewRouter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

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
app.use('/api/users', verifyToken, userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, _next) => {
  logger.error('Global Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
