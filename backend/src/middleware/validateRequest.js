import logger from '../config/logger.js';
// const schemas = {
//   headlineQuerySchema,
//   articleParamSchema,
//   articleBodySchema,
// };
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