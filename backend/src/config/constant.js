export const ALLOWED_CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

export const ALLOWED_COUNTRIES = [
  'ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za',
];
export const DEFAULT_COUNTRY = process.env.DEFAULT_COUNTRY || 'us';

export const buildArticleValues = (article) => [
  article.title || null,
  article.description || null,
  article.urlToImage || article.url_to_image || null,
  article.source?.name || article.source_name || null,
  article.publishedAt || article.published_at || null,
  article.content || null,
  article.url || null,
  article.author || null,
  article.category || null,
  article.country || null,
];