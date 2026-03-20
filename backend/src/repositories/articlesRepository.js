import pool from '../config/db.js';

async function findArticleById(id) {
  const query = `
    SELECT id,
           title,
           description,
           content,
           url,
           url_to_image   AS "urlToImage",
           author,
           source_name    AS "sourceName",
           category,
           published_at   AS "publishedAt"
    FROM articles
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

export { findArticleById };

