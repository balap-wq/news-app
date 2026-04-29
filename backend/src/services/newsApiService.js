import axios from 'axios';
import logger from '../config/logger.js';
const BASE_URL = process.env.NEWS_API_BASE_URL;
const API_KEY = process.env.NEWS_API_KEY;

// ✅ FIX: allow tests to run
if (!BASE_URL && process.env.NODE_ENV !== 'test') {
  throw new Error('Missing NEWS_API_BASE_URL in .env');
}

if (!API_KEY && process.env.NODE_ENV !== 'test') {
  throw new Error('Missing NEWS_API_KEY in .env');
}

export const fetchTopHeadlines = async ({ country = 'us', category, pageSize = 100 }) => {
  try {
    const url = `${process.env.FRONTEND_URL}/top-headlines`;

    logger.info(`Requesting: ${url} (category: ${category})`);

    const response = await axios.get(url, {
      params: {
        apiKey: API_KEY,
        country,
        category,
        pageSize,
      },
      timeout: 10000,
    });

    if (response.data.status !== 'ok') {
      throw new Error('Invalid response from News API');
    }

    return response.data.articles;
  } catch (error) {
    logger.error('News API Error:', {
      message: error.message,
      status: error.response?.status,
    });

    throw new Error('Failed to fetch news');
  }
};
