import logger from '../config/logger.js';

const INVALID_REQUEST_RESPONSE = {
  success: false,
  error: 'Invalid request',
  message: 'Invalid request',
};

const SWAGGER_LINKS = {
  '/api/headlines': 'http://localhost:5000/api-docs#/Headlines/get_api_headlines',
  '/api/articles/:id': 'http://localhost:5000/api-docs#/Articles/get_api_articles__id_',
};

const PREVIEW_LINKS = {
  '/api/headlines': (req) =>
    `http://localhost:5000/api-preview/headlines${req.query && Object.keys(req.query).length ? '?' + new URLSearchParams(req.query).toString() : ''}`,
  '/api/articles/:id': (req) => `http://localhost:5000/api-preview/articles/${req.params.id}`,
};

export const validateRequest = ({ body, query, params }) => {
  return (req, res, next) => {
    try {
      const method = req.method;
      const endpoint = req.baseUrl + (req.route?.path || '');

      // 1️⃣ Which endpoint was hit
      logger.info(`\n📡 ${method} ${endpoint}`);

      // 2️⃣ Individual request data
      if (Object.keys(req.query).length) logger.info('   Query Params :', req.query);
      if (Object.keys(req.params).length) logger.info('   Route Params :', req.params);
      if (req.body && Object.keys(req.body).length) logger.info('   Body         :', req.body);

      // 🔹 BODY
      if (body) {
        const parsed = body.safeParse(req.body);
        if (!parsed.success) {
          logger.warn('   ❌ Zod body validation FAILED:', parsed.error.flatten().fieldErrors);
          return res.status(400).json({
            ...INVALID_REQUEST_RESPONSE,
            errors: parsed.error.flatten().fieldErrors,
          });
        }
        req.body = parsed.data;
      }

      // 🔹 QUERY
      if (query) {
        const parsed = query.safeParse(req.query);
        if (!parsed.success) {
          logger.warn('   ❌ Zod query validation FAILED:', parsed.error.flatten().fieldErrors);
          return res.status(400).json({
            ...INVALID_REQUEST_RESPONSE,
            errors: parsed.error.flatten().fieldErrors,
          });
        }
        req.query = parsed.data;
      }

      // 🔹 PARAMS
      if (params) {
        const parsed = params.safeParse(req.params);
        if (!parsed.success) {
          logger.warn('   ❌ Zod params validation FAILED:', parsed.error.flatten().fieldErrors);
          return res.status(400).json({
            ...INVALID_REQUEST_RESPONSE,
            errors: parsed.error.flatten().fieldErrors,
          });
        }
        req.params = parsed.data;
      }

      // 3️⃣ Zod passed
      logger.info('   ✅ Zod validation PASSED');

      // 4️⃣ Swagger link
      const swaggerLink = SWAGGER_LINKS[endpoint];
      if (swaggerLink) {
        logger.info(`   📖 Swagger docs  : ${swaggerLink}`);
      }

      // 5️⃣ Quick Preview link
      const previewFn = PREVIEW_LINKS[endpoint];
      if (previewFn) {
        logger.info(`   🔗 Quick preview : ${previewFn(req)}`);
      }

      next();
    } catch (err) {
      console.error('Validation middleware error:', err);
      return res.status(500).json({
        success: false,
        error: 'Validation failed',
        message: 'Validation failed',
      });
    }
  };
};
