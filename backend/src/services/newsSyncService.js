import { fetchTopHeadlines } from './newsApiService.js';
import prisma from '../prismaClient.js';
import { ALLOWED_CATEGORIES, DEFAULT_COUNTRY } from '../config/constant.js';
import logger from '../config/logger.js';

export async function syncHeadlines() {
  logger.info('Starting Sync Headlines Service...');

  let updated = 0;

  for (const category of ALLOWED_CATEGORIES) {
    let articles;

    try {
      articles = await fetchTopHeadlines({
        country: DEFAULT_COUNTRY,
        category,
      });
    } catch (error) {
      logger.error(`Failed to fetch headlines for category ${category}:`, error);
      continue;
    }

    if (!Array.isArray(articles) || articles.length === 0) {
      logger.warn(`No articles fetched for category ${category}`);
      continue;
    }

    for (const article of articles) {
      try {
        const { source, urlToImage, publishedAt, ...articleData } = article;

        // ✅ FIXED mapping (snake_case)
        const mappedArticle = {
          title: articleData.title || 'No Title',
          description: articleData.description || '',
          content: articleData.content || '',
          url: articleData.url,

          url_to_image: urlToImage || '',
          source_name: source?.name || '',
          published_at: publishedAt ? new Date(publishedAt) : null,

          category: category || 'general',
          country: DEFAULT_COUNTRY,
        };

        await prisma.article.upsert({
          where: {
            url: mappedArticle.url,
          },
          update: mappedArticle,
          create: mappedArticle,
        });

        updated++;
      } catch (error) {
        logger.error('Error processing article:', error);
      }
    }
  }

  logger.info('Sync Headlines Service completed', {
    articlesProcessed: updated,
  });
}
