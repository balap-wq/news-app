
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "newsdb",
  password: "your_password",
  port: 5432,
});

export async function findArticleById(id) {
  const result = await pool.query(
    "SELECT * FROM articles WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

