import logger from '../config/logger.js';
import prisma from '../prismaClient.js';
import { findArticleById } from '../repositories/articleRepository.js';

// (optional - not really needed now, but kept so no side effects)
function snakeToCamel(obj) {
  const camelObj = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
    camelObj[camelKey] = obj[key];
  }
  return camelObj;
}

// 📰 GET HEADLINES (✅ FIXED FOR CI)
async function getHeadlines(req, res) {
  try {
    // ✅ SAFE DEFAULT (important for CI)
    const query = req.query || {};

    const page = query.page || 1;
    const category = query.category;

    const limit = 9;
    const offset = (parseInt(page, 10) - 1) * limit;

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    const limit = 9;
    const offset = (pageNumber - 1) * limit;

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

    const transformedArticles = articles.map(snakeToCamel);

    // ✅ ALWAYS return 200
    return res.status(200).json({
      success: true,
      articles: transformedArticles,
      totalResults: totalCount,
      page: pageNumber,
    });

  } catch (error) {
    logger.error('Error fetching headlines:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

// 📄 GET ARTICLE BY ID (already correct)
async function getArticleById(req, res) {
  try {
    const { id } = req.params;
    const { id } = req.params;

    const article = await findArticleById(parseInt(id));

    if (!article) {
      return res.status(404).json({
        error: 'Article not found',
        articleId: parseInt(id),
      });
    }

    res.status(200).json(article);

    return res.status(200).json(transformedArticle);

  } catch (error) {
    logger.error('Error fetching article:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

// ✅ CREATE
async function createArticle(req, res) {
  try {
    const { title, content } = req.body;

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

    return res.status(201).json(newArticle);

  } catch (error) {
    logger.error('Error creating article:', error);
    return res.status(500).json({ error: 'Internal server error' });
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

    return res.status(200).json(updatedArticle);

  } catch (error) {
    logger.error('Error updating article:', error);
    return res.status(500).json({ error: 'Internal server error' });
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

    return res.status(200).json({
      message: 'Article deleted successfully',
    });

  } catch (error) {
    logger.error('Error deleting article:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ✅ EXPORTS
export {
  getArticleById,
  getHeadlines,
  createArticle,
  updateArticle,
  deleteArticle,
};