import { findArticleById,   findTopHeadlines, countArticles } from '../repositories/articleRepository.js'; 
import logger from '../config/logger.js';

function snakeToCamel(obj) {
  const camelObj = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    camelObj[camelKey] = obj[key];
  }
  return camelObj;
}

async function getHeadlines(req, res) {
  try {
    const { page = 1, category } = req.query;
    
    const limit = 9;
    const offset = (parseInt(page, 10) - 1) * limit;

    if (isNaN(offset) || offset < 0) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    const articles = await findTopHeadlines({ limit, offset, category });
    const totalCount = await countArticles({ category });

    res.status(200).json({
      articles,
      totalResults: totalCount,
      page: parseInt(page, 10),
    });
  } catch (error) {
    logger.error('Error fetching headlines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getArticleById(req, res) {
  try {
    const { id } = req.params; 

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

export { getArticleById,getHeadlines  };