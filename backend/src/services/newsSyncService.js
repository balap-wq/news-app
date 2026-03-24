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
     
      const {
        source,
        urlToImage,
        publishedAt,
        ...rest
      } = article;

      
      const mappedArticle = {
        ...rest, 
        source_name: source?.name || "",
        url_to_image: urlToImage || "",
        published_at: publishedAt,
        category: "general",
      };

      const result = await upsertArticle(mappedArticle);

      if (result === "inserted") inserted++;
      else if (result === "updated") updated++;

    } catch (error) {
      console.error("Error processing article:", error);
    }
  }

  console.log(
  `Sync Headlines Service completed  | Inserted: ${inserted} | Updated: ${updated}`
);
}
