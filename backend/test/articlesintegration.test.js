import request from 'supertest';
import { jest } from '@jest/globals';

// ✅ MOCK PRISMA (IMPORTANT FIX)
await jest.unstable_mockModule('../src/prismaClient.js', () => ({
  __esModule: true,
  default: {
    article: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

// ✅ Mock logger
await jest.unstable_mockModule('../src/config/logger.js', () => ({
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

// ✅ Import after mocks
const { default: prisma } = await import('../src/prismaClient.js');
const { default: app } = await import('../src/app.js');

describe('GET /api/articles/:id Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test 1 — Success
  it('should return 200 with article data', async () => {
    prisma.article.findUnique.mockResolvedValue({
      id: 1,
      title: 'Test Article',
      description: 'Test Desc',
    });

    const response = await request(app).get('/api/articles/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('title', 'Test Article');
    expect(response.body).toHaveProperty('description', 'Test Desc');
  });

  // ✅ Test 2 — snake_case → camelCase
  it('should return 200 with camelCase transformed fields', async () => {
    prisma.article.findUnique.mockResolvedValue({
      id: 1,
      title: 'Test Article',
      url_to_image: 'https://example.com/image.jpg',
      source_name: 'BBC News',
      published_at: '2026-01-01',
    });

    const response = await request(app).get('/api/articles/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('urlToImage', 'https://example.com/image.jpg');
    expect(response.body).toHaveProperty('sourceName', 'BBC News');
    expect(response.body).toHaveProperty('publishedAt', '2026-01-01');
  });

  // ✅ Test 3 — Not found
  it('should return 404 if article not found', async () => {
    prisma.article.findUnique.mockResolvedValue(null);

    const response = await request(app).get('/api/articles/9999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Article not found');
    expect(response.body).toHaveProperty('articleId', 9999);
  });

  // ✅ Test 4 — Invalid ID
  it('should return 400 if id is not a valid number', async () => {
    const response = await request(app).get('/api/articles/abc');

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Invalid request');
    expect(response.body.errors).toHaveProperty('id');
  });

  // ✅ Test 5 — GET /api/articles (THIS WAS FAILING BEFORE)
  it('should return 200 if no id segment in path', async () => {
    prisma.article.findMany.mockResolvedValue([]);
    prisma.article.count.mockResolvedValue(0);

    const response = await request(app).get('/api/articles/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });

  // ✅ Test 6 — Unknown route
  it('should return 404 for unknown route', async () => {
    const response = await request(app).get('/api/unknown');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Route not found');
  });

  // ✅ Test 7 — DB error
  it('should return 500 on unexpected DB error', async () => {
    prisma.article.findUnique.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/api/articles/1');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal server error');
  });
});