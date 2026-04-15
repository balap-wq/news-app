import { fetchTopHeadlines } from './newsApiService.js';
import prisma from '../prismaClient.js'; // ✅ use Prisma
import { ALLOWED_CATEGORIES, DEFAULT_COUNTRY } from '../config/constant.js';
import logger from '../config/logger.js';

export async function syncHeadlines() {
  logger.info('Starting Sync Headlines Service...');
  
  let inserted = 0;
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
        const { source, urlToImage, publishedAt, ...rest } = article;

        // ✅ Map API data → Prisma format (camelCase)
        const mappedArticle = {
          title: rest.title || 'No Title',
          content: rest.description || '',
          url: rest.url,
          urlToImage: urlToImage || '',
          source: source?.name || '',
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          category: category || 'general',
          country: DEFAULT_COUNTRY,
        };

        // ✅ UPSERT (insert or update)
        const result = await prisma.article.upsert({
          where: {
            url: mappedArticle.url, // must be UNIQUE in schema
          },
          update: mappedArticle,
          create: mappedArticle,
        });

        if (result) {
          updated++; // Prisma upsert doesn't tell insert/update separately → safe increment
        }

      } catch (error) {
        logger.error('Error processing article:', error);
      }
    }
  }

  logger.info('Sync Headlines Service completed', {
    articlesProcessed: inserted + updated,
  });
}