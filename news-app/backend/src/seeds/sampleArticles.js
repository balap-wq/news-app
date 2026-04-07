import pool from "../config/db.js";
import logger from "../config/logger.js";

const articles = [
  // (your data unchanged)
];

const seedArticles = async () => {
  try {
    logger.info("Seeding articles data...");

    for (const article of articles) {
      await pool.query(
        `INSERT INTO articles 
        (title, description, url_to_image, source_name, published_at, created_at, content, url, author, category)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          article.title,
          article.description,
          article.url_to_image,
          article.source_name,
          article.published_at,
          article.created_at,
          article.content,
          article.url,
          article.author,
          article.category,
        ]
      );
    }

    logger.info("Articles Seeded Successfully!");
    process.exit(0); // ✅ success exit
  } catch (error) {
    logger.error("Seeding Error:", error); // ✅ cleaned message
    process.exit(1);
  }
};

seedArticles();