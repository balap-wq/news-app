import logger from '../config/logger.js';
import prisma from '../prismaClient.js';
import { findArticleById } from '../repositories/articleRepository.js';
import snakeToCamel from '../utils/caseHandling.js';

// 📰 GET HEADLINES
async function getHeadlines(req, res) {
  try {
    const { page = 1, category } = req.query;

    const pageNumber = parseInt(page, 10);
    const limit = 9;

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    const offset = (pageNumber - 1) * limit;

    const whereCondition = category ? { category } : {};

    let articles = [];
    let totalCount = 0;

    try {
      articles = await prisma.article.findMany({
        where: whereCondition,
        skip: offset,
        take: limit,
        orderBy: {
          published_at: 'desc', 
        },
      });

      totalCount = await prisma.article.count({
        where: whereCondition,
      });
    } catch (dbError) {
      logger.error('DB Error in getHeadlines:', dbError);
    }

    const transformedArticles = snakeToCamel(articles);

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

// 📄 GET ARTICLE BY ID
async function getArticleById(req, res) {
  try {
    const id = req.params.id;
    const articleId = parseInt(id, 10);

    if (isNaN(articleId) || articleId <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid article ID',
      });
    }

    const article = await findArticleById(articleId);

    if (!article) {
      return res.status(404).json({
        error: 'Article not found',
        articleId,
      });
    }

    const transformedArticle = snakeToCamel(article);

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
    const { title, content, url, description } = req.body;

    const trimmedTitle = title?.trim();
    const trimmedContent = content?.trim() || null;
    const trimmedDescription = description?.trim() || null;

    if (!trimmedTitle) {
      return res.status(400).json({
        success: false,
        error: 'Title is required',
      });
    }

    if (!url?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'URL is required',
      });
    }

    let normalizedUrl;
    try {
      normalizedUrl = new URL(url.trim()).toString();
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format',
      });
    }

    if (trimmedContent && trimmedContent.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Content must be at least 10 characters',
      });
    }

    if (trimmedDescription && trimmedDescription.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Description too long',
      });
    }

    // ✅ Pre-check for duplicate
    const existing = await prisma.article.findUnique({
      where: { url: normalizedUrl },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'Article with this URL already exists',
      });
    }

    const newArticle = await prisma.article.create({
      data: {
        title: trimmedTitle,
        content: trimmedContent,
        url: normalizedUrl,
        description: trimmedDescription,
      },
    });

    return res.status(201).json(newArticle);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: 'Article with this URL already exists',
      });
    }

    logger.error('Error creating article:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

// ✅ UPDATE
async function updateArticle(req, res) {
  try {
    const id = req.params.id;
    const articleId = parseInt(id, 10);

    if (isNaN(articleId) || articleId <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid article ID',
      });
    }

    const { title, content } = req.body;

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: { title, content },
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
    const id = req.params.id;
    const articleId = parseInt(id, 10);

    if (isNaN(articleId) || articleId <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid article ID',
      });
    }

    await prisma.article.delete({
      where: { id: articleId },
    });

    return res.status(200).json({
      message: 'Article deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting article:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export { getArticleById, getHeadlines, createArticle, updateArticle, deleteArticle };
