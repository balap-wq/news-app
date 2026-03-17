import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import headlineRoutes from './routes/headlineRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));

app.use(express.json());

app.use(headlineRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get('/api/news', (_req, res) => {
  res.json({ message: 'News endpoint ready', articles: [] });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;