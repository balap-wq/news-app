import axios from 'axios';
import logger from '../config/logger.js';
import 'dotenv/config';

// Environment variables
const BASE_URL = process.env.NEWS_API_BASE_URL;
const API_KEY = process.env.NEWS_API_KEY;

// 🔍 DEBUG LOGS (add this)
logger.info(`BASE_URL: ${BASE_URL}`);
logger.info(`API_KEY: ${API_KEY ? 'Loaded ✅' : 'Missing ❌'}`);

// ❗ Validation (safe)
if (!BASE_URL) {
  throw new Error('Missing NEWS_API_BASE_URL in .env');
}

if (!API_KEY) {
  throw new Error('Missing NEWS_API_KEY in .env');
}

// Main Function
export const fetchTopHeadlines = async ({ country = 'us', category, pageSize = 100 }) => {
  try {
    const url = `${BASE_URL}/top-headlines`;

    // 🔍 Debug URL (without exposing full key)
    logger.info(`Requesting: ${url} (category: ${category})`);

    const response = await axios.get(url, {
      params: {
        apiKey: API_KEY,
        country,
        category,
        pageSize,
      },
      timeout: 10000, // ✅ prevent hanging
    });

    if (response.data.status !== 'ok') {
      throw new Error('Invalid response from News API');
    }

    const articles = response.data.articles;

    logger.info(`Fetched ${articles.length} articles for ${category}`);

    return articles;

  } catch (error) {
    logger.error("News API Error:", {
      message: error.message,
      status: error.response?.status,
    });

    throw new Error('Failed to fetch news');
  }
};