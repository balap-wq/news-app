import logger from '../config/logger.js';

export const validateRequest = ({ body, query, params } = {}) => {
  return (req, res, next) => {

    if (body) {
      const parsed = body.safeParse(req.body);
      if (!parsed.success) {
        logger.warn('Invalid request body:', parsed.error.flatten());
        return res.status(400).json({
          success: false,
          message: 'Invalid request body',
          errors: parsed.error.flatten().fieldErrors,
        });
      }
      req.body = parsed.data;
    }

    if (query) {
      const parsed = query.safeParse(req.query);
      if (!parsed.success) {
        logger.warn('Invalid query params:', parsed.error.flatten());
        return res.status(400).json({
          success: false,
          message: 'Invalid query parameters',
          errors: parsed.error.flatten().fieldErrors,
        });
      }
      req.query = parsed.data;
    }

    if (params) {
      const parsed = params.safeParse(req.params);
      if (!parsed.success) {
        logger.warn('Invalid route params:', parsed.error.flatten());
        return res.status(400).json({
          success: false,
          message: 'Invalid route parameters',
          errors: parsed.error.flatten().fieldErrors,
        });
      }
      req.params = parsed.data;
    }

    next();
  };
};