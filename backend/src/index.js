// ✅ 1. LOAD ENV (FORCE PATH)
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// ✅ 2. VALIDATE ENV
import "./config/env.js";

import express from "express";
import cors from "cors";
import logger from "./config/logger.js";

import adminRoutes from "./routes/adminRoutes.js";
import articlesRoutes from "./routes/articles.js";
import headlinesRouter from "./routes/headlines.js";

import syncArticles from "./jobs/syncJob.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import { testConnection } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

// ✅ 3. TEST DATABASE CONNECTION
await testConnection();

const app = express();

// ✅ 4. PORT
const PORT = process.env.PORT || 5000;

// ✅ 5. MIDDLEWARES
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());

// ✅ 6. ROUTES
app.use("/api/articles", articlesRoutes);
app.use("/api/headlines", headlinesRouter);
app.use("/api/admin", adminRoutes);

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
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ✅ 8. SAMPLE ROUTE
app.get("/api/news", (_req, res) => {
  res.json({ message: "News endpoint ready", articles: [] });
});

// ✅ 9. SWAGGER (ONLY IN PRODUCTION)
if (process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// ✅ 10. BACKGROUND JOB
syncArticles();

// ✅ 11. ERROR HANDLER (MUST BE LAST)
app.use(errorHandler);

// ✅ 12. START SERVER
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;
 
