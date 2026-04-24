-- CreateTable
CREATE TABLE "articles" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "content" TEXT,
    "url" TEXT NOT NULL,
    "url_to_image" TEXT,
    "source_name" TEXT,
    "author" TEXT,
    "category" TEXT,
    "country" TEXT,
    "published_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_url_key" ON "articles"("url");

-- CreateIndex
CREATE INDEX "articles_category_published_at_idx" ON "articles"("category", "published_at" DESC);

-- CreateIndex
CREATE INDEX "articles_country_published_at_idx" ON "articles"("country", "published_at" DESC);

-- CreateIndex
CREATE INDEX "articles_published_at_idx" ON "articles"("published_at" DESC);
