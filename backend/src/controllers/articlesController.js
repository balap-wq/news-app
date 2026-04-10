import {
  findArticleById,
  findTopHeadlines,
  countArticles,
} from '../repositories/articleRepository.js'; // ✅ removed findAllArticles

import logger from '../config/logger.js';

// 🔄 snake_case → camelCase
function snakeToCamel(obj) {
  const camelObj = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, char) =>
      char.toUpperCase()
    );
    camelObj[camelKey] = obj[key];
  }
  return camelObj;
}

// 📰 GET HEADLINES
async function getHeadlines(req, res) {
  try {
    const { page = 1, category } = req.query;

    const pageNumber = parseInt(page, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    const limit = 9;
    const offset = (pageNumber - 1) * limit;

    const articles = await findTopHeadlines({
      limit,
      offset,
      category,
    });

    const totalCount = await countArticles({ category });

    // ✅ transform list
    const transformedArticles = articles.map(snakeToCamel);

    res.status(200).json({
      success: true,
      articles: transformedArticles,
      totalResults: totalCount,
      page: pageNumber,
    });
  } catch (error) {
    logger.error('Error fetching headlines:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

// 📄 GET ARTICLE BY ID
async function getArticleById(req, res) {
  try {
    const { id } = req.params;

    const article = await findArticleById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
        articleId: id,
      });
    }

    const transformedArticle = snakeToCamel(article);

    res.status(200).json(transformedArticle);
  } catch (error) {
    logger.error('Error fetching article:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

export { getArticleById, getHeadlines };