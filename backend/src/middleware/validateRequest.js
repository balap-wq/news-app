import logger from '../config/logger.js';

const INVALID_REQUEST_RESPONSE = {
  success: false,
  error: 'Invalid request',
  message: 'Invalid request',
};

export const validateRequest = ({ body, query, params }) => {
  return (req, res, next) => {
    try {
      // 🔹 BODY
      if (body) {
        const parsed = body.safeParse(req.body);
        if (!parsed.success) {
          logger.warn('Invalid body:', parsed.error.flatten());
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
          logger.warn('Invalid query:', parsed.error.flatten());
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
          logger.warn('Invalid params:', parsed.error.flatten());
          return res.status(400).json({
            ...INVALID_REQUEST_RESPONSE,
            errors: parsed.error.flatten().fieldErrors,
          });
        }
        req.params = parsed.data;
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
