import { findArticleById } from '../repositories/articleRepository.js';
import { findTopHeadlines } from '../repositories/articleRepository.js';
import logger from '../config/logger.js';

 async function getHeadlines(req, res) {
  try {
    const { limit, offset, category } = req.query;

    const headlines = await findTopHeadlines({
      limit: limit ? parseInt(limit) : 10,
      offset: offset ? parseInt(offset) : 0,
      category,
    });

    res.status(200).json({
      success: true,
      data: headlines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'failed to fetch data',
    });
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

export { getArticleById, getHeadlines };
