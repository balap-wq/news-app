import logger from '../config/logger.js';
import prisma from '../prismaClient.js'; // ✅ use Prisma
import { ALLOWED_CATEGORIES, ALLOWED_COUNTRIES } from '../config/constant.js';

// ✅ Custom ValidationError class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// 🔍 Validate & normalize input
function validateAndNormalize(value, allowedValues, fieldName) {
  if (!value) return undefined;

  const normalized = value.trim().toLowerCase();

  if (!allowedValues.includes(normalized)) {
    throw new ValidationError(
      `Invalid ${fieldName}. Allowed values: ${allowedValues.join(', ')}`
    );
  }

  return normalized;
}

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

// 🚀 Controller
export async function getHeadlines(req, res, next) {
  try {
    logger.info('Incoming request query:', req.query);

    const { limit, category, country, page } = req.query;

    // 🔢 Safe parsing
    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageLimit = limit ? parseInt(limit, 10) : 9;

    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new ValidationError('Invalid page number');
    }

    if (isNaN(pageLimit) || pageLimit < 1) {
      throw new ValidationError('Invalid limit value');
    }

    const pageOffset = (pageNumber - 1) * pageLimit;

    // ✅ Normalize inputs
    const normalizedCategory = validateAndNormalize(
      category,
      ALLOWED_CATEGORIES,
      'category'
    );

    const normalizedCountry = validateAndNormalize(
      country,
      ALLOWED_COUNTRIES,
      'country'
    );

    logger.info('Normalized values:', {
      category: normalizedCategory,
      country: normalizedCountry,
      limit: pageLimit,
      offset: pageOffset,
    });

    // ✅ Prisma DB calls (FIXED)
    const whereCondition = {
      ...(normalizedCategory && { category: normalizedCategory }),
      ...(normalizedCountry && { country: normalizedCountry }),
    };

    const headlines = await prisma.article.findMany({
      where: whereCondition,
      skip: pageOffset,
      take: pageLimit,
      orderBy: {
        publishedAt: 'desc',
      },
    });

    const totalResults = await prisma.article.count({
      where: whereCondition,
    });

    logger.info(`Fetched ${headlines.length} articles`);

    // 🔄 Transform data
    const transformedArticles = headlines.map(snakeToCamel);

    // 📤 Response (FIXED duplicate key)
    res.status(200).json({
      success: true,
      articles: transformedArticles,
      totalResults,
      count: transformedArticles.length,
      page: pageNumber,
    });

  } catch (error) {
    logger.error('Error in getHeadlines:', {
      message: error.message,
      stack: error.stack,
    });

    // ✅ Handle validation error
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}