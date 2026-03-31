import logger from '../config/logger.js';
import { findTopHeadlines, countArticles } from '../repositories/articleRepository.js';

const ALLOWED_CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

const ALLOWED_COUNTRIES = [
  'ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za',
];

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
    const { limit, offset, category, country } = req.query;
    const pageLimit = limit ? parseInt(limit, 10) : 10;
    const pageOffset = offset ? parseInt(offset, 10) : 0;

    if (category) {
      const normalizedCategory = category.toLowerCase();
      if (!ALLOWED_CATEGORIES.includes(normalizedCategory)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category. Allowed values: business, entertainment, general, health, science, sports, technology.',
        });
      }
    }

    if (country) {
      const normalizedCountry = country.toLowerCase();
      if (!ALLOWED_COUNTRIES.includes(normalizedCountry)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid country. Use a valid 2-letter country code.',
        });
      }
        
    }

    const normalizedCategory = category ? category.toLowerCase() : undefined;
    const normalizedCountry = country ? country.toLowerCase() : undefined;

    const headlines = await findTopHeadlines({
      limit: pageLimit,
      offset: pageOffset,
      category: normalizedCategory,
      country: normalizedCountry,
    });

    

    // Get total count for pagination
    const totalResults = await countArticles({
      category: normalizedCategory,
      country: normalizedCountry,
    });

    // Convert snake_case to camelCase for frontend
    const transformedArticles = headlines.map(snakeToCamel);

    res.status(200).json({
      success: true,
      articles: transformedArticles,
      totalResults: totalResults,
      count: transformedArticles.length,
    });
  } catch (error) {
    logger.error(error);

    res.status(500).json({
      success: false,
      message: 'failed to fetch data',
    });
  }
}
