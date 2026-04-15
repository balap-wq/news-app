import logger from '../config/logger.js';
import prisma from '../prismaClient.js'; // ✅ use Prisma
import { ALLOWED_CATEGORIES, ALLOWED_COUNTRIES } from '../config/constant.js';

// (kept same - no breaking change)
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

// (kept - but Prisma already returns camelCase, still safe)
function snakeToCamel(obj) {
  const camelObj = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    camelObj[camelKey] = obj[key];
  }
  return camelObj;
}

export async function getHeadlines(req, res, next) {
  try {
    const { limit, category, country, page } = req.query;
    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageLimit = limit ? parseInt(limit, 10) : 9;
    const pageOffset = (pageNumber - 1) * pageLimit;

    // ✅ declare here so accessible everywhere
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

    // Prisma where condition (dynamic)
    const whereCondition = {};

    if (normalizedCategory) {
      whereCondition.category = normalizedCategory;
    }

    if (normalizedCountry) {
      whereCondition.country = normalizedCountry;
    }

    // FETCH DATA
    const headlines = await prisma.article.findMany({
      where: whereCondition,
      skip: pageOffset,
      take: pageLimit,
      orderBy: {
        publishedAt: 'desc',
      },
    });

    // COUNT
    const totalResults = await prisma.article.count({
      where: whereCondition,
    });

    const transformedArticles = headlines.map(snakeToCamel);

    res.status(200).json({
      success: true,
      articles: transformedArticles,
      totalResults,
      count: transformedArticles.length,
      page: pageNumber,
    });

  } catch (error) {
    logger.error(error);
    next(error);
  }
}