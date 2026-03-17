import pool from '../config/db.js';

async function findTopHeadlines({ limit, offset }) {
  const query = `
    SELECT id, title, description,
           url_to_image AS "urlToImage",
           source_name AS "sourceName",
           published_at AS "publishedAt"
    FROM articles
    ORDER BY published_at DESC
    LIMIT $1 OFFSET $2
  `;
  console.log(query);
  
  const { rows } = await pool.query(query, [limit, offset]);
  return rows;
}

async function countArticles() {
  const { rows } = await pool.query('SELECT COUNT(*) FROM articles');
  return parseInt(rows[0].count, 10);
}

export { findTopHeadlines, countArticles };