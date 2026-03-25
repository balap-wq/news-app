import pool from "../config/db.js";
import logger from "../config/logger.js";

// INSERT
async function insertArticle(article) {
  const query = `
    INSERT INTO articles (
      title, description, url_to_image, source_name,
      published_at, created_at, content, url, author, category
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
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
  ];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    logger.error("Insert article failed", { error: error.message });
    throw error;
  }
}

// UPSERT
async function upsertArticle(article) {
  const query = `
    INSERT INTO articles (
      title, description, content, url, url_to_image,
      author, source_name, category, published_at
    )
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
      published_at = COALESCE(EXCLUDED.published_at, articles.published_at),
      updated_at = NOW()

    WHERE
      articles.title IS DISTINCT FROM EXCLUDED.title OR
      articles.description IS DISTINCT FROM EXCLUDED.description OR
      articles.content IS DISTINCT FROM EXCLUDED.content OR
      articles.url_to_image IS DISTINCT FROM EXCLUDED.url_to_image OR
      articles.author IS DISTINCT FROM EXCLUDED.author OR
      articles.source_name IS DISTINCT FROM EXCLUDED.source_name OR
      articles.category IS DISTINCT FROM EXCLUDED.category OR
      articles.published_at IS DISTINCT FROM EXCLUDED.published_at

    RETURNING (xmax = 0) AS inserted;
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

  try {
    const result = await pool.query(query, values);

    const row = result.rows?.[0];

    if (!row) return "no-change";

    return row.inserted ? "inserted" : "updated";

  } catch (error) {
    logger.error("Upsert article failed", { error: error.message });
    throw error;
  }
}

// FIND BY ID
async function findArticleById(id) {
  const query = `SELECT * FROM articles WHERE id = $1;`;

  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  } catch (error) {
    logger.error("Find article failed", { error: error.message });
    throw error;
  }
}

// FIND HEADLINES
async function findTopHeadlines({ limit = 10, offset = 0, category }) {
  let query = `SELECT * FROM articles `;
  const values = [];

  if (category) {
    query += `WHERE category = $1 `;
    values.push(category);
  }

  query += `
    ORDER BY published_at DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2};
  `;

  values.push(limit, offset);

  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    logger.error("Find headlines failed", { error: error.message });
    throw error;
  }
}

// COUNT
async function countArticles({ category }) {
  let query = `SELECT COUNT(*) FROM articles `;
  const values = [];

  if (category) {
    query += `WHERE category = $1 `;
    values.push(category);
  }

  try {
    const { rows } = await pool.query(query, values);
    return parseInt(rows[0].count, 10);
  } catch (error) {
    logger.error("Count articles failed", { error: error.message });
    throw error;
  }
}

export {
  insertArticle,
  upsertArticle,
  findArticleById,
  findTopHeadlines,
  countArticles,
};