import axios from "axios";

// Correct env variable names
const BASE_URL = process.env.NEWS_API_BASE_URL;
const API_KEY = process.env.NEWS_API_KEY;

// Custom Error Classes
class NewsApiRateLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = "NewsApiRateLimitError";
  }
}

class NewsApiAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "NewsApiAuthError";
  }
}

class NewsApiFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = "NewsApiFetchError";
  }
}

export const fetchTopHeadlines = async ({
  country = "us",
  category,
  pageSize = 100,
}) => {
  try {
    const response = await axios.get(`${BASE_URL}top-headlines`, {
      params: {
        apiKey: API_KEY,
        country,
        category,
        pageSize,
      },
    });

    // Validate API response
    if (response.data.status !== "ok") {
      throw new NewsApiFetchError("Failed to fetch headlines");
    }

    const articles = response.data.articles;

    console.log(`Fetched ${articles.length} articles`);

    return articles;
  } catch (error) {
    console.error("News API Error:", {
      message: error.message,
      status: error.response?.status,
    });

    // Handle API errors
    if (error.response) {
      const status = error.response.status;

      if (status === 429) {
        throw new NewsApiRateLimitError("Rate limit exceeded");
      }

      if (status === 401) {
        throw new NewsApiAuthError("Invalid API key");
      }
    }

    // Fallback
    throw new NewsApiFetchError(error.message || "Failed to fetch news");
  }
};