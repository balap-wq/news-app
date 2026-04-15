-- Create articles table

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  content TEXT,
  author TEXT,
  source_name TEXT,
  url TEXT,
  url_to_image TEXT,
  published_at TIMESTAMP,
  category TEXT,
  country TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
-- Indexes for performance 

-- Index on published_at (for sorting/filtering latest news)
CREATE INDEX articles_published_at 
ON articles (published_at);

-- Index on category (for filtering by category)
CREATE INDEX articles_category 
ON articles (category);

-- Note: To rollback, run: DROP TABLE IF EXISTS articles CASCADE;