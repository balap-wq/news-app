import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import {
  headlineQuerySchema,
  articleParamSchema,
  articleBodySchema,
} from '../schemas/articleSchema.js';

const registry = new OpenAPIRegistry();

// 🔹 GET /articles
registry.registerPath({
  method: 'get',
  path: '/api/articles',
  tags: ['Articles'],
  description: 'Fetch all news articles',
  request: {
    query: headlineQuerySchema, // ✅ FIX: now used
  },
  responses: {
    200: {
      description: 'List of articles',
    },
  },
});

// 🔹 GET /articles/:id
registry.registerPath({
  method: 'get',
  path: '/api/articles/{id}',
  tags: ['Articles'],
  request: {
    params: articleParamSchema,
  },
  responses: {
    200: {
      description: 'Article found',
    },
    404: {
      description: 'Article not found',
    },
  },
});

// 🔹 POST /articles
registry.registerPath({
  method: 'post',
  path: '/api/articles',
  tags: ['Articles'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: articleBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Article created',
    },
  },
});

// 🔹 PUT /articles/:id
registry.registerPath({
  method: 'put',
  path: '/api/articles/{id}',
  tags: ['Articles'],
  request: {
    params: articleParamSchema,
    body: {
      content: {
        'application/json': {
          schema: articleBodySchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Updated',
    },
  },
});

// 🔹 DELETE /articles/:id
registry.registerPath({
  method: 'delete',
  path: '/api/articles/{id}',
  tags: ['Articles'],
  request: {
    params: articleParamSchema,
  },
  responses: {
    200: {
      description: 'Deleted',
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

const swaggerSpec = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'News API',
    version: '1.0.0',
  },
  servers: [{ url: 'http://localhost:5000' }],
});

export default swaggerSpec;
