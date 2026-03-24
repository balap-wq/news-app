import pool from "../config/db.js";

//INSERTING QUERY 
async function insertArticle(article) {

  const query =` INSERT INTO articles(title,description,url_to_image,source_name,published_at,created_at,content,url,author,category)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
  RETURNING *;
  `;

  const values =[
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
    const { row } =await pool.query(query,values);
    return row[0];
  } 

  catch (error) {
    console.error("Here some Inserting errors:",error.message);
    throw error;
  }
}

//UPSERTING QUERY 
 async function upsertArticle(article) {

  const query = `
    INSERT INTO articles
    (title,description,url_to_image,source_name,published_at,created_at,content,url,author,category)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)

    ON CONFLICT (url)
    DO UPDATE SET
      title = COALESCE(EXCLUDED.title, articles.title),
      description = COALESCE(EXCLUDED.description, articles.description),
      url_to_image = COALESCE(EXCLUDED.url_to_image,articles.url_to_image),
      source_name = COALESCE(EXCLUDED.source_name, articles.source_name),
      published_at = COALESCE(EXCLUDED.published_at, articles.published_at)
      created_at = COALESCE(EXCLUDED.created_at, articles.created_at)
      content = COALESCE(EXCLUDED.content, articles.content),
      url = COALESCE(EXCLUDED.url, articles.url),
      author = COALESCE(EXCLUDED.author, articles.author),
      category = COALESCE(EXCLUDED.category, articles.category),
  `;

  const values =[
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
    const { row } =await pool.query(query,values);
    return row[0];
  } 

  catch (error) {
    console.error("Here some upSerting errors:",error.message);
    throw error;
  }
}

//FIND ARTICLE_BY_ID QUERY

async function findArticleById(id) {

  const query = `SELECT * FROM articles
  WHERE id = $1;
  `;

try {
  const { rows } = await pool.query(query,[id])
  return rows[0] || "There is no data Available.";
} 

catch (error) {
  console.error("Here some Find Article error:",error.message);
  throw error;
}
}

// FIND TOP_HEADLINES

async function findTopHeadlines({ limit = 10, offset = 0, category}) {

  let query = `SELECT * FROM articles`;
  const values = [];

  if (category) {
    query +=`WHERE category = $1`;
    values.push(category);
  }

  query += `ORDER BY published_at DESC
  LIMIT $${values.length + 1}
  OFFSET $${values.length +2};
  `;

  values.push(limit, offset);

  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } 
  catch (error) {
    console.error("Here some Find Top Headline Error",error.message);
  }
}

//COUNT ARTICLES

async function countArticles({category}) {
  let query = `SELECT COUNT(*) FROM articles`;
  const values = [];

  if (category) {
    query +=`WHERE category=$1
    `;
    values.push(category);

  try {
    const { rows } = await pool.query(query, values);
    return parseInt(rows[0].count, 10);
  } 
  catch (error) {
    console.error("Error counting articles:", error.message);
    throw error;
  }
  }

}

export { insertArticle, upsertArticle, findArticleById, findTopHeadlines, countArticles };