-- Create articles table

CREATE TABLE articles (
    id ADD GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    content TEXT,
    url VARCHAR(1000) UNIQUE NOT NULL,
    url_to_image VARCHAR(1000),
    source_name VARCHAR(255),
    author VARCHAR(255),
    category VARCHAR(100),
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOW(),
);

-- Indexes for performance 

-- Index on published_at (for sorting/filtering latest news)
CREATE INDEX articles_published_at 
ON articles (published_at);

-- Index on category (for filtering by category)
CREATE INDEX articles_category 
ON articles (category);

-- Rollback: Drop Articles Table
DROP TABLE IF EXISTS articles;