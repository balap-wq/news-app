import dotenv from "dotenv";

// Load .env variables
dotenv.config();

// App config
export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || "development";

// API config
export const BASE_URL =
  process.env.BASE_URL || "https://newsapi.org/v2";

export const API_KEY = process.env.NEWS_API_KEY;

// Validation (optional but useful)
if (!API_KEY) {
  console.warn("⚠️ NEWS_API_KEY is missing in .env file");
}