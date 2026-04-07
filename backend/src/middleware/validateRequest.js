import logger from '../config/logger.js';

export function validateRequest({ schema }) {
  return (req, res, next) => {
    const data = Object.keys(req.params).length > 0 ? req.params : req.query;
    const result = schema.safeParse(data);
    if (!result.success) {
      logger.warn('Validation failed:', result.error.flatten());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
    }
    next();
  };
}
