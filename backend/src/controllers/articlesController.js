import { findArticleById } from '../repositories/articleRepository.js';
import { findTopHeadlines, countArticles } from '../services/articleService.js';
import logger from '../config/logger.js';

async function getHeadlines(req, res) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.pageSize, 10) || 9;
    const category = req.query.category || null;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid pagination values' });
    }

    const offset = (page - 1) * limit;
    const articles = await findTopHeadlines({ limit, offset, category });
    const totalResults = await countArticles({ category });

    return res.status(200).json({ articles, totalResults });
  } catch (error) {
    logger.error('Error fetching headlines:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
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

    res.status(200).json(article);

  } catch (error) {
    logger.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { getHeadlines, getArticleById };