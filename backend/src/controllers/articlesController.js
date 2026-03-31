import { findArticleById } from '../repositories/articleRepository.js'; // ✅ ADD import
import logger from '../config/logger.js';

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
    const { id } = req.params; // ✅ Zod already validated & coerced to number

    const article = await findArticleById(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found', articleId: id });
    }

    const transformedArticle = snakeToCamel(article);
    res.status(200).json(transformedArticle);
  } catch (error) {
    logger.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { getArticleById };