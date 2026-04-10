import pool from '../config/db.js';
import logger from '../config/logger.js';

async function executeQuery(query, values = []) {
  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    logger.error('Database error:', error);
    throw error;
  }
}

// INSERT
async function insertArticle(article) {
  if (!article) throw new Error('Article data is required');

  const query = `
    INSERT INTO articles (
      title, description, url_to_image, source_name,
      published_at, content, url, author, category, country
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
    article.content,
    article.url,
    article.author,
    article.category,
    article.country || null,
  ];

  const rows = await executeQuery(query, values);

  if (!rows || rows.length === 0) {
    throw new Error('Insert failed');
  }

  return rows[0];
}

// UPSERT
async function upsertArticle(article) {
  if (!article || !article.url) {
    throw new Error('Invalid article data (url required)');
}

const query = `
INSERT INTO articles (
  title, description, url_to_image, source_name,
  published_at, content, url, author, category, country
)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
ON CONFLICT (url)
DO UPDATE SET
  title = COALESCE(EXCLUDED.title, articles.title),
  description = COALESCE(EXCLUDED.description, articles.description),
  url_to_image = COALESCE(EXCLUDED.url_to_image, articles.url_to_image),
  source_name = COALESCE(EXCLUDED.source_name, articles.source_name),
  published_at = COALESCE(EXCLUDED.published_at, articles.published_at),
  content = COALESCE(EXCLUDED.content, articles.content),
  author = COALESCE(EXCLUDED.author, articles.author),
  category = COALESCE(EXCLUDED.category, articles.category),
  country = COALESCE(EXCLUDED.country, articles.country)
WHERE
  articles.title IS DISTINCT FROM EXCLUDED.title OR
  articles.description IS DISTINCT FROM EXCLUDED.description OR
  articles.content IS DISTINCT FROM EXCLUDED.content OR
  articles.url_to_image IS DISTINCT FROM EXCLUDED.url_to_image OR
  articles.author IS DISTINCT FROM EXCLUDED.author OR
  articles.source_name IS DISTINCT FROM EXCLUDED.source_name OR
  articles.category IS DISTINCT FROM EXCLUDED.category OR
  articles.country IS DISTINCT FROM EXCLUDED.country OR
  articles.published_at IS DISTINCT FROM EXCLUDED.published_at
RETURNING (xmax = 0) AS inserted;
`;
const values = [
article.title || null,
article.description || null,
article.urlToImage || article.url_to_image || null,
article.source?.name || article.source_name || null,
article.publishedAt || article.published_at || null,
article.content || null,
article.url,
article.author || null,
article.category || null,
article.country || null,
];

const rows = await executeQuery(query, values);

if (!rows || rows.length === 0) {
  return 'no-change'; // ✅ correct handling
}

return rows[0].inserted ? 'inserted' : 'updated';
}

async function findArticleById(id) {
  const query = `SELECT * FROM articles WHERE id = $1;`;
  const rows = await executeQuery(query, [id]);
  return rows[0] || null;
}

async function findTopHeadlines({ limit = 10, offset = 0, category, country }) {
  limit = Math.min(limit, 100);

  let query = `SELECT * FROM articles `;
  const values = [];
  const conditions = [];

  if (category) {
    conditions.push(`category = $${values.length + 1}`);
    values.push(category);
  }

  if (country) {
    conditions.push(`country = $${values.length + 1}`);
    values.push(country);
  }

  if (conditions.length > 0) {
    query += `WHERE ${conditions.join(' AND ')} `;
  }

  query += `
    ORDER BY published_at DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2};
  `;

  values.push(limit, offset);

  logger.info(`Category: ${category || 'ALL'}`);

  return await executeQuery(query, values);
}

// COUNT
async function countArticles({ category, country }) {
  let query = `SELECT COUNT(*) FROM articles `;
  const values = [];
  const conditions = [];

  if (category) {
    conditions.push(`category = $${values.length + 1}`);
    values.push(category);
  }

  if (country) {
    conditions.push(`country = $${values.length + 1}`);
    values.push(country);
  }

  if (conditions.length > 0) {
    query += `WHERE ${conditions.join(' AND ')}`;
  }

  const rows = await executeQuery(query, values);
  return parseInt(rows[0].count, 10);
}

export {  insertArticle, upsertArticle, findArticleById, findTopHeadlines, countArticles };