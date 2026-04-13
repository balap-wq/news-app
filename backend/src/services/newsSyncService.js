import { fetchTopHeadlines } from './newsApiService.js';
import { upsertArticle } from '../repositories/articleRepository.js';
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

        const mappedArticle = {
          ...rest,
          url: article.url,
          source_name: source?.name || '',
          url_to_image: urlToImage || '',
          published_at: publishedAt ? new Date(publishedAt) : null,
          created_at: new Date(),
          category: article.category || category || 'general',
          country: DEFAULT_COUNTRY,
        };

        const result = await upsertArticle(mappedArticle);

        if (result === 'inserted') inserted += 1;
        else if (result === 'updated') updated += 1;
      } catch (error) {
        logger.error('Error processing article:', error);
      }
    }
  }

  logger.info('Sync Headlines Service completed', {
    articlesInserted: inserted,
    articlesUpdated: updated,
  });
}
