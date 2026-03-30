import { findArticleById } from '../repositories/articleRepository.js';
import logger from '../config/logger.js';

// Helper function to convert snake_case to camelCase
function snakeToCamel(obj) {
  const camelObj = {};

  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (match) =>
      match[1].toUpperCase()
    );
    camelObj[camelKey] = obj[key];
  }

  return camelObj;
}

export async function getArticleById(req, res) {
  try {
    // ID is already validated & transformed by middleware
    const { id } = req.params;

    const article = await findArticleById(id);

    // Handle not found
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
        articleId: id,
      });
    }

    // Convert DB response to camelCase
    const transformedArticle = snakeToCamel(article);

    return res.status(200).json({
      success: true,
      data: transformedArticle,
    });

  } catch (error) {
    logger.error('Error fetching article:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}