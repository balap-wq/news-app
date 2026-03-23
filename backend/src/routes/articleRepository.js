import pool from "../config/db.js";

export async function upsertArticle(article) {
  const query = `
    INSERT INTO articles
    (title, description, content, url, url_to_image, author, source_name, category, published_at)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)

    ON CONFLICT (url)
    DO UPDATE SET
      title = COALESCE(EXCLUDED.title, articles.title),
      description = COALESCE(EXCLUDED.description, articles.description),
      content = COALESCE(EXCLUDED.content, articles.content),
      url_to_image = COALESCE(EXCLUDED.url_to_image, articles.url_to_image),
      author = COALESCE(EXCLUDED.author, articles.author),
      source_name = COALESCE(EXCLUDED.source_name, articles.source_name),
      category = COALESCE(EXCLUDED.category, articles.category),
      published_at = COALESCE(EXCLUDED.published_at, articles.published_at)
  `;

  const values = [
    article.title,
    article.description,
    article.content,
    article.url,
    article.url_to_image,
    article.author,
    article.source_name,
    article.category,
    article.published_at,
  ];

  await pool.query(query, values);
}
await syncHeadlines();
await syncHeadlines();