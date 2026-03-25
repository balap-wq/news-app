import pool from "../config/db.js";

// 🔹 Insert or update article
export async function upsertArticle(article) {
  try {
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

  } catch (error) {
    console.error("DB ERROR (upsertArticle):", error);
    throw error;
  }
}

// 🔹 Get article by ID
export async function findArticleById(id) {
  try {
    console.log("Fetching article with ID:", id);

    const query = `
      SELECT id,
             title,
             description,
             content,
             url,
             url_to_image AS "urlToImage",
             author,
             source_name AS "sourceName",
             category,
             published_at AS "publishedAt"
      FROM articles
      WHERE id = $1
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];

  } catch (error) {
    console.error("DB ERROR (findArticleById):", error);
    throw error;
  }
}
