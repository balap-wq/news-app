import logger from '../config/logger.js';
import { findTopHeadlines, countArticles } from '../repositories/articleRepository.js';
import logger from '../config/logger.js';

function snakeToCamel(obj) {
  const camelObj = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    camelObj[camelKey] = obj[key];
  }
  return camelObj;
}

export async function getHeadlines(req, res) {
  try {
    const { page, category } = req.query; // ✅ use page from Zod schema
    const limit = 9;
    const offset = (page - 1) * limit; // ✅ Zod coerced page to number already

    const headlines = await findTopHeadlines({ limit, offset, category });
    const totalResults = await countArticles({ category });
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

    res.status(500).json({
      success: false,
      message: 'Failed to fetch data',
    });
  }
}