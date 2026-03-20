CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  content TEXT,
  url VARCHAR(1000) UNIQUE,
  url_to_image VARCHAR(1000),
  author VARCHAR(255),
  source_name VARCHAR(255),
  category VARCHAR(100),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);