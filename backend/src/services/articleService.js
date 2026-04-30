import prisma from '../prismaClient.js';
import logger from '../config/logger.js';

// Get headlines with pagination
export const findTopHeadlines = async ({ limit = 10, offset = 0 }) => {
  // 🛑 Prevent DB call during unit test
  if (process.env.NODE_ENV === 'test') {
    throw new Error('DB should not be called during unit test');
  }

  try {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        url_to_image: true,
        source_name: true,
        published_at: true,
      },
      orderBy: {
        published_at: 'desc',
      },
      take: limit,
      skip: offset,
    });

    // 🔄 map to your API format
    return articles.map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      urlToImage: a.url_to_image,
      sourceName: a.source_name,
      publishedAt: a.published_at,
    }));
  } catch (error) {
    logger.error('Error in findTopHeadlines:', error);
    throw new Error('Failed to fetch headlines');
  }
};

// Get total count
export const countArticles = async () => {
  if (process.env.NODE_ENV === 'test') {
    throw new Error('DB should not be called during unit test');
  }

  try {
    const count = await prisma.article.count();
    return count;
  } catch (error) {
    logger.error('Error in countArticles:', error);
    throw new Error('Failed to count articles');
  }
};
