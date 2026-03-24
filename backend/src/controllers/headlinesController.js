import logger from '../config/logger.js';
import { findTopHeadlines, countArticles } from '../services/articleService.js';

export async function getHeadlines(req, res) {
  try {
    let { page = 1, limit = 9, category } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // ✅ VALIDATION - PAGE
    if (page < 1) {
      return res.status(400).json({ error: 'Invalid page' });
    }

    // ✅ VALIDATION - CATEGORY
    const allowedCategories = ['business', 'sports', 'technology', 'health'];

    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const offset = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      findTopHeadlines({ limit, offset }),
      countArticles(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      data: articles,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ error: 'Server Error' });
  }
}
