import { fetchTopHeadlines } from "./newsApiService.js";
import { upsertArticle } from "../repositories/articleRepository.js";

export async function syncHeadlines() {
  console.log("Starting Sync Headlines Service...");

  const articles = await fetchTopHeadlines({
    country: "us",
    category: "general",
  });

  if (!articles || articles.length === 0) {
    console.log("No articles fetched");
    return;
  }

  let inserted = 0;
  let updated = 0;

  for (const article of articles) {
    try {
      const mappedArticle = {
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        urlToImage: article.urlToImage,
        author: article.author,
        sourceName: article.source?.name,
        category: "general",
        publishedAt: article.publishedAt,
      };

      const result = await upsertArticle(mappedArticle);

      if (result === "inserted") inserted++;
      else if (result === "updated") updated++;

    } catch (error) {
      console.error("Error processing article:", error);
    }
  }

  console.log(`Sync completed → Inserted: ${inserted}, Updated: ${updated}`);
}