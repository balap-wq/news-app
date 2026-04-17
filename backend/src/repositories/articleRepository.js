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

    await prisma.article.upsert({
      where: {
        url: mappedArticle.url,
      },
      update: {
        title: mappedArticle.title,
        content: mappedArticle.content,

        // ✅ FIX: use DB column names
        url_to_image: mappedArticle.url_to_image,
        source_name: mappedArticle.source_name ,
        published_at: mappedArticle.published_at,

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

    return  'success';

  } catch (error) {
    console.error('Upsert Error:', error);
    throw error;
  }
}