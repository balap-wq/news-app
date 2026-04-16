import logger from '../config/logger.js';

export const validateRequest = ({ schema } = {}) => {
  return (req, res, next) => {
    let data;
    let source;

    if (req.body && Object.keys(req.body).length > 0) {
      data = req.body;
      source = 'body';
    } else if (req.params && Object.keys(req.params).length > 0) {
      data = req.params;
      source = 'params';
    } else if (req.query && Object.keys(req.query).length > 0) {
      data = req.query;
      source = 'query';
    }

    // ✅ FIX: if no data found, skip validation and move on
    if (!data) {
      return next();
    }

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      logger.warn('Invalid request:', parsed.error.flatten());
      return res.status(400).json({
        success: false,
        message: 'Invalid request',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    req[source] = parsed.data;

    next();
  };
};