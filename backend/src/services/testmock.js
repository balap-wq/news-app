import "dotenv/config"; // ✅ loads .env

import { fetchTopHeadlines } from "./newsApiService.js";

const run = async () => {
  try {
    const articles = await fetchTopHeadlines({
      country: "us",
      category: "business",
    });

    console.log("\n📰 Articles Output:\n");

    articles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
    });

  } catch (error) {
    console.error("❌ Final Error:", error.message);
  }
};

run();
console.log("BASE_URL:", process.env.NEWS_API_BASE_URL);
console.log("API_KEY:", process.env.NEWS_API_KEY);