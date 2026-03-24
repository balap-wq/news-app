import axios from "axios";
import logger from "../config/logger";

const BASE_URL = process.env.NEWS_API_BASE_URL;
const API_KEY = process.env.NEWS_API_KEY;

export const fetchTopHeadlines = async ({
  country = "us",
  category,
  pageSize = 100,
}) => {
    const response = await axios.get(`${BASE_URL}top-headlines`, {
      params: {
        apiKey: API_KEY,
        country,
        category,
        pageSize,
      },
    });

    // ✅ Validate API response
    if (response.data.status !== "ok") {
      throw new Error("Failed to fetch headlines");
    }

    const articles = response.data.articles;    

    // ✅ Log count
    logger.info(`Fetched ${articles.length} articles`);
    
    // Returns articles only
    return articles;
};