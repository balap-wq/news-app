import { findArticleById } from '../repositories/articleRepository.js';
import logger from '../config/logger.js';

async function getArticleById(req, res) {
  try {
    const parsedId = parseInt(req.params.id, 10);

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

export { getArticleById };
