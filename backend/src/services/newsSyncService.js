import { fetchTopHeadlines } from './newsApiService.js';
import { upsertArticle } from '../repositories/articleRepository.js';
import logger from '../config/logger.js';

export async function syncHeadlines() {
  logger.info('Starting Sync Headlines Service...');

  let articles;
  try {
    articles = await fetchTopHeadlines({
      country: 'us',
      category: 'general',
    });
  } catch (error) {
    logger.error('Failed to fetch headlines:', error);
    return;
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    logger.warn('No articles fetched');
    return;
  }

  let inserted = 0;
  let updated = 0;

  for (const article of articles) {
    try {
      const { source, urlToImage, publishedAt, ...rest } = article;

      const mappedArticle = {
        ...rest,
        source_name: source?.name || '',
        url_to_image: urlToImage || '',
        published_at: publishedAt ? new Date(publishedAt) : null,
        created_at: new Date(),
        category: 'general',
      };

      const result = await upsertArticle(mappedArticle);

      if (result === 'inserted') inserted += 1;
      else if (result === 'updated') updated += 1;
    } catch (error) {
      logger.error('Error processing article:', error);
    }
  }

  logger.info('Sync Headlines Service completed', {
    articlesInserted: inserted,
    articlesUpdated: updated,
  });
}
