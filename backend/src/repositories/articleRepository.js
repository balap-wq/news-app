import prisma from '../prismaClient.js';
import logger from '../config/logger.js';

// ✅ FIND BY ID (IMPORTANT for tests)
export async function findArticleById(id) {
  try {
    return await prisma.article.findUnique({
      where: { id },
    });
  } catch (error) {
    logger.error('Error in findArticleById:', error);
    throw error;
  }
}

// ✅ UPSERT (existing)
export async function upsertArticle(mappedArticle) {
  try {
    const result = await prisma.article.upsert({
      where: {
        url: mappedArticle.url,
      },
      update: {
        title: mappedArticle.title,
        content: mappedArticle.content,
        urlToImage: mappedArticle.url_to_image,
        source: mappedArticle.source,
        publishedAt: mappedArticle.published_at,
        category: mappedArticle.category,
        country: mappedArticle.country,
      },
      create: {
        title: mappedArticle.title,
        content: mappedArticle.content,
        url: mappedArticle.url,
        urlToImage: mappedArticle.url_to_image,
        source: mappedArticle.source,
        publishedAt: mappedArticle.published_at,
        category: mappedArticle.category,
        country: mappedArticle.country,
        userId: 1,
      },
    });

    return result;
  } catch (error) {
    console.error('Upsert Error:', error);
    throw error;
  }
}