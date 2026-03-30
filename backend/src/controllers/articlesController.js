import { findArticleById } from '../repositories/articleRepository.js';
import { findTopHeadlines, countArticles } from '../services/articleService.js';
import logger from '../config/logger.js';

// Helper function to convert snake_case to camelCase
function snakeToCamel(obj) {
  const camelObj = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    camelObj[camelKey] = obj[key];
  }
  return camelObj;
}

async function getArticleById(req, res) {
  try {
    const { id } = req.params;

    const parsedId = parseInt(id, 10);
    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({ error: 'Invalid article ID' });
    }

    const article = await findArticleById(parsedId);

    if (!article) {
      return res.status(404).json({ error: 'Article not found', articleId: parsedId });
    }

    // Convert snake_case to camelCase for frontend
    const transformedArticle = snakeToCamel(article);

    res.status(200).json(transformedArticle);
  } catch (error) {
    logger.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { getArticleById };
