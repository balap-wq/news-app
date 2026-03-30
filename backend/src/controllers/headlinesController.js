import { findTopHeadlines, countArticles } from '../repositories/articleRepository.js';

// Helper function to convert snake_case to camelCase
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
    const { limit, offset, category } = req.query;
    const pageLimit = limit ? parseInt(limit) : 10;
    const pageOffset = offset ? parseInt(offset) : 0;

    const headlines = await findTopHeadlines({
      limit: pageLimit,
      offset: pageOffset,
      category,
    });

    // Get total count for pagination
    const totalResults = await countArticles({ category });

    // Convert snake_case to camelCase for frontend
    const transformedArticles = headlines.map(snakeToCamel);

    res.status(200).json({
      success: true,
      articles: transformedArticles,
      totalResults: totalResults,
      count: transformedArticles.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'failed to fetch data',
    });
  }
}
