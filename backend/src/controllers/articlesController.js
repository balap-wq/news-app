import logger from '../config/logger.js';
import prisma from '../prismaClient.js';

// (optional - not really needed now, but kept so no side effects)
function snakeToCamel(obj) {
  const camelObj = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    camelObj[camelKey] = obj[key];
  }
  return camelObj;
}

// ✅ GET ALL ARTICLES (HEADLINES)
async function getHeadlines(req, res) {
  try {
    const { page = 1, category } = req.query;

    const limit = 9;
    const offset = (parseInt(page, 10) - 1) * limit;

    if (isNaN(offset) || offset < 0) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    // ✅ Prisma filter
    const whereCondition = category ? { category } : {};

    const articles = await prisma.article.findMany({
      where: whereCondition,
      skip: offset,
      take: limit,
      orderBy: {
        publishedAt: 'desc',
      },
    });

    const totalCount = await prisma.article.count({
      where: whereCondition,
    });

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

// ✅ GET BY ID
async function getArticleById(req, res) {
  try {
    const { id } = req.params;

    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!article) {
      return res.status(404).json({
        error: 'Article not found',
        articleId: id,
      });
    }

    res.status(200).json(article);

  } catch (error) {
    logger.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ✅ CREATE
async function createArticle(req, res) {
  try {
    const { title, content } = req.body;

    console.log("BODY:", req.body);

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content required",
      });
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
      },
    });

    res.status(201).json(newArticle);

  } catch (error) {
    logger.error('Error creating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ✅ UPDATE
async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedArticle = await prisma.article.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
      },
    });

    res.status(200).json(updatedArticle);

  } catch (error) {
    logger.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ✅ DELETE
async function deleteArticle(req, res) {
  try {
    const { id } = req.params;

    await prisma.article.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: 'Article deleted successfully',
    });

  } catch (error) {
    logger.error('Error deleting article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {
  getArticleById,
  getHeadlines,
  createArticle,
  updateArticle,
  deleteArticle,
};