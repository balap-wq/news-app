import { findTopHeadlines, countArticles } from '../services/articleService.js';

export async function getHeadlines(req, res) {
  try {
    let { page = 1, limit = 20 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1) page = 1;
    if (limit < 1) limit = 20;

    const offset = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      findTopHeadlines({ limit, offset }),
      countArticles(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: articles,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}