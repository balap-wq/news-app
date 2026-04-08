import logger from '../config/logger.js';
import { findTopHeadlines, countArticles } from '../repositories/articleRepository.js';
import { ALLOWED_CATEGORIES, ALLOWED_COUNTRIES } from '../config/constant.js';


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

    const headlines = await findTopHeadlines({
      limit: pageLimit,
      offset: pageOffset,
      category: normalizedCategory,
      country: normalizedCountry,
    });

    const totalResults = await countArticles({
      category: normalizedCategory,
      country: normalizedCountry,
    });

    const transformedArticles = headlines.map(snakeToCamel);

    res.status(200).json({
      success: true,
      articles: transformedArticles,
      totalResults,
      count: transformedArticles.length,
      page, // ✅ send page back to frontend
    });

  } catch (error) {
    logger.error(error);

    next(error);
  }
}