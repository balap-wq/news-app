import "dotenv/config"; // ✅ loads .env

import { fetchTopHeadlines } from "./newsApiService.js";
import logger from "../config/logger.js";

const run = async () => {
  try {
    const articles = await fetchTopHeadlines({
      country: "us",
      category: "business",
    });

    logger.info("\n📰 Articles Output:\n");

    articles.forEach((article, index) => {
      logger.info(`${index + 1}. ${article.title}`);
    });

  } catch (error) {
    logger.error("❌ Final Error:", error.message);
  }
};

run();
logger.info("BASE_URL:", process.env.NEWS_API_BASE_URL);
logger.info("API_KEY:", process.env.NEWS_API_KEY);