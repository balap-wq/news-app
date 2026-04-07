import logger from '../config/logger.js';

export function validateRequest({ schema }) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query.id ? req.params : req.query);
    if (!result.success) {
      logger.warn('Validation failed:', result.error.flatten());
      return res.status(400).json({
        success: false,
        message: 'Invalid request parameters',
        errors: result.error.flatten().fieldErrors,
      });
    }
    next();
  };
}
