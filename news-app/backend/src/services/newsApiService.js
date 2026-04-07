import axios from 'axios';
import logger from '../config/logger.js';
import 'dotenv/config';

// ✅ Custom Error Classes
export class NewsApiRateLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NewsApiRateLimitError';
  }
}

export class NewsApiAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NewsApiAuthError';
  }
}

export class NewsApiFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NewsApiFetchError';
  }
}

// Environment variables
const BASE_URL = process.env.NEWS_API_BASE_URL;
const API_KEY = process.env.NEWS_API_KEY;

// Main Function
export const fetchTopHeadlines = async ({ country = 'us', category, pageSize = 100 }) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: API_KEY,
        country,
        category,
        pageSize,
      },
    });

    // Validate response
    if (response.data.status !== 'ok') {
      throw new NewsApiFetchError('Invalid response from News API');
    }

    const articles = response.data.articles;

    // ✅ Log count
    logger.info(`Fetched ${articles.length} articles`);

    // Returns articles only
    return articles;
  } catch (error) {
    // Log error with context
    logger.error("News API Error:", {
      message: error.message,
      status: error.response?.status,
    });

    // Handle Axios response errors
    if (error.response) {
      const status = error.response.status;

      if (status === 429) {
        throw new NewsApiRateLimitError('Rate limit exceeded');
      }

      if (status === 401) {
        throw new NewsApiAuthError('Invalid API key');
      }
    }

    // Network / unknown errors
    throw new NewsApiFetchError('Failed to fetch news');
  }
};
