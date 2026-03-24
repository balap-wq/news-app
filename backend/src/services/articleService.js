import pool from '../config/db.js';

// Get headlines with pagination
export const findTopHeadlines = async ({ limit, offset }) => {
  // 🛑 Prevent DB call during unit test
  if (process.env.NODE_ENV === 'test') {
    throw new Error('DB should not be called during unit test');
  }

  try {
    const query = `
      SELECT 
        id, 
        title, 
        description,
        url_to_image AS "urlToImage",
        source_name AS "sourceName",
        published_at AS "publishedAt"
      FROM articles
      ORDER BY published_at DESC
      LIMIT $1 OFFSET $2
    `;

    const { rows } = await pool.query(query, [limit, offset]);

    return rows;
  } catch (error) {
    console.error('Error in findTopHeadlines:', error);
    throw new Error('Failed to fetch headlines');
  }
};

// Get total count
export const countArticles = async () => {
  // 🛑 Prevent DB call during unit test
  if (process.env.NODE_ENV === 'test') {
    throw new Error('DB should not be called during unit test');
  }

  try {
    const query = `SELECT COUNT(*) FROM articles`;

    const { rows } = await pool.query(query);

    return parseInt(rows[0].count, 10);
  } catch (error) {
    console.error('Error in countArticles:', error);
    throw new Error('Failed to count articles');
  }
};
