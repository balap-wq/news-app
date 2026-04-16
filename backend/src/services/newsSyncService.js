import { fetchTopHeadlines } from './newsApiService.js';
import prisma from '../prismaClient.js';
import { ALLOWED_CATEGORIES, DEFAULT_COUNTRY } from '../config/constant.js';
import logger from '../config/logger.js';

export async function syncHeadlines() {
  logger.info('Starting Sync Headlines Service...');

  let processed = 0; // ✅ single counter (fix ESLint issue)

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

        // ❗ Skip invalid articles (IMPORTANT FIX)
        if (!rest.url) {
          logger.warn('Skipping article with missing URL');
          continue;
        }

        // ✅ Map API → Prisma
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

        // ✅ UPSERT
        await prisma.article.upsert({
          where: { url: mappedArticle.url },
          update: mappedArticle,
          create: mappedArticle,
        });

        processed++; // ✅ correct counter

      } catch (error) {
        logger.error('Error processing article:', error);
      }
    }
  }

  logger.info('Sync Headlines Service completed', {
    articlesProcessed: processed,
  });
}