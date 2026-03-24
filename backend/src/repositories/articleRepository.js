import pool from "../config/db.js";

export async function upsertArticle(article) {
  const query = `
  INSERT INTO articles (
    title,
    description,
    content,
    url,
    url_to_image,
    author,
    source_name,
    category,
    published_at
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

  const result = await pool.query(query, values);


  return result.rows[0].inserted ? "inserted" : "updated";
}