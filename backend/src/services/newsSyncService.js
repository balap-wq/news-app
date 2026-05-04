import { fetchTopHeadlines } from './newsApiService.js';
import prisma from '../prismaClient.js';
import { ALLOWED_CATEGORIES, DEFAULT_COUNTRY } from '../config/constant.js';
import logger from '../config/logger.js';

// ⏱ Utility delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function syncHeadlines() {
  logger.info('Starting Sync Headlines Service...');

  let articlesProcessed = 0;
  let successFetch = 0;
  let failedFetch = 0;

  try {
    for (const category of ALLOWED_CATEGORIES) {
      let articles = null;

      try {
        articles = await fetchTopHeadlines({
          country: DEFAULT_COUNTRY,
          category,
        });

        successFetch++;
      } catch (error) {
        //  Handle rate limit
        if (error.response?.status === 429) {
          logger.warn(`Rate limit hit for category ${category}. Stopping further requests.`);
          break;
        }

        failedFetch++;
        logger.error(`Failed to fetch headlines for category ${category}:`, {
          error: error.message,
        });
      }

      // ALWAYS delay (important fix)
      await delay(1500);

      // Skip if no data
      if (!Array.isArray(articles) || articles.length === 0) {
        logger.warn(`No articles fetched for category ${category}`);
        continue;
      }

      //  Process articles
      for (const article of articles) {
        try {
          const { source, urlToImage, publishedAt, ...articleData } = article;

          const mappedArticle = {
            title: articleData.title || 'No Title',
            content: articleData.description || '',
            url: articleData.url,
            url_to_image: urlToImage || '',
            source_name: source?.name || '',
            published_at: publishedAt ? new Date(publishedAt) : null,
            category: category || 'general',
            country: DEFAULT_COUNTRY,
          };

          await prisma.article.upsert({
            where: { url: mappedArticle.url },
            update: mappedArticle,
            create: mappedArticle,
          });

          articlesProcessed++;
        } catch (error) {
          logger.error('Error processing article:', {
            error: error.message,
          });
        }
      }
    }

    // Final summary log
    logger.info('Sync Headlines Service completed', {
      articlesProcessed,
      successFetch,
      failedFetch,
    });
  } catch (error) {
    logger.error('Sync Headlines Service failed completely', {
      error: error.message,
    });
  }
}
