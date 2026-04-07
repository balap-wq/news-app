import { findArticleById, findAllArticles } from '../repositories/articleRepository.js';
import logger from '../config/logger.js';

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

export async function getArticles(req, res) {
  try {
    const articles = await findAllArticles();
    return res.status(200).json(articles);
  } catch (error) {
    logger.error('Error fetching articles:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

export async function getArticleById(req, res) {
  try {
    const id = Number(req.params.id);
    const article = await findArticleById(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
        articleId: id,
      });
    }
    const transformedArticle = snakeToCamel(article);
    return res.status(200).json(transformedArticle);
  } catch (error) {
    logger.error('Error fetching article:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
