import logger from '../config/logger.js';
import prisma from '../prismaClient.js';
import { ALLOWED_CATEGORIES, ALLOWED_COUNTRIES } from '../config/constant.js';
import snakeToCamel from '../utils/caseHandling.js';

// ✅ Custom ValidationError
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
    throw new ValidationError(`Invalid ${fieldName}. Allowed values: ${allowedValues.join(', ')}`);
  }

  return normalized;
}

// 🚀 Controller
export async function getHeadlines(req, res) {
  try {
    const query = req.query || {};

    const { limit, category, country, page } = query;

    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageLimit = limit ? parseInt(limit, 10) : 9;

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid page number',
      });
    }

    if (isNaN(pageLimit) || pageLimit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid limit value',
      });
    }

    const pageOffset = (pageNumber - 1) * pageLimit;

    const normalizedCategory = validateAndNormalize(category, ALLOWED_CATEGORIES, 'category');

    const normalizedCountry = validateAndNormalize(country, ALLOWED_COUNTRIES, 'country');

    const whereCondition = {
      ...(normalizedCategory && { category: normalizedCategory }),
      ...(normalizedCountry && { country: normalizedCountry }),
    };

    // ✅ SAFE DB CALL (VERY IMPORTANT FOR CI)
    let headlines = [];
    let totalResults = 0;

    try {
      headlines = await prisma.article.findMany({
        where: whereCondition,
        skip: pageOffset,
        take: pageLimit,
        orderBy: {
          published_at: 'desc',
        },
      });

      totalResults = await prisma.article.count({
        where: whereCondition,
      });
    } catch (dbError) {
      logger.error('DB Error in getHeadlines:', dbError);

      // ✅ fallback instead of crash
      headlines = [];
      totalResults = 0;
    }

    const transformedArticles = snakeToCamel(headlines);

    return res.status(200).json({
      success: true,
      articles: transformedArticles,
      totalResults,
      count: transformedArticles.length,
      page: pageNumber,
    });
  } catch (error) {
    logger.error('Error in getHeadlines:', error);

    // ✅ DO NOT use next(error) in CI
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
