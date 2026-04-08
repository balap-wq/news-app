import request from 'supertest';
import { jest } from '@jest/globals';

const mockFindArticleById = jest.fn();
const mockCountArticles = jest.fn();
const mockFindTopHeadlines = jest.fn();

await jest.unstable_mockModule('../src/repositories/articleRepository.js', () => ({
  findArticleById: mockFindArticleById,
  countArticles: mockCountArticles,
  findTopHeadlines: mockFindTopHeadlines,
}));

// ✅ Mock logger to suppress Winston logs during tests
await jest.unstable_mockModule('../src/config/logger.js', () => ({
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

const { default: app } = await import('../src/app.js');
const { getArticleById } = await import('../src/controllers/articlesController.js'); // ✅ import controller

describe('GET /api/articles/:id Integration Tests', () => {
  let req, res; // ✅ properly declared

  beforeEach(() => {
    req = {
      params: { id: 1 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  // ✅ Test 1 — Success
  it('should return 200 with article data', async () => {
    mockFindArticleById.mockResolvedValue({
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

  // ✅ Test 2 — Not found
  it('should return 404 if article not found', async () => {
    mockFindArticleById.mockResolvedValue(null);

    const response = await request(app).get('/api/articles/9999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Article not found');
    expect(response.body).toHaveProperty('articleId', 9999);
  });

  // ✅ Test 3 — Invalid ID handled by Zod middleware
  it('should return 400 if id is not a valid number', async () => {
    const response = await request(app).get('/api/articles/abc'); // ✅ fixed: use integration style

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Invalid request');
  });

  // ✅ Test 4 — DB error
  it('should return 500 on unexpected error', async () => {
    mockFindArticleById.mockRejectedValue(new Error('DB error'));

    await getArticleById(req, res); // ✅ now works since getArticleById is imported

    expect(mockFindArticleById).toHaveBeenCalledWith(1);
    expect(mockFindArticleById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Internal server error',
    });
  });

  // ✅ Test 5 — snake_case to camelCase transformation
  it('should transform snake_case keys to camelCase', async () => {
    mockFindArticleById.mockResolvedValue({
      id: 1,
      title: 'Test Article',
      url_to_image: 'https://example.com/image.jpg',
      source_name: 'BBC News',
      published_at: '2026-01-01',
    });

    await getArticleById(req, res); // ✅ now works since getArticleById is imported

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Article',
      urlToImage: 'https://example.com/image.jpg',
      sourceName: 'BBC News',
      publishedAt: '2026-01-01',
    });
  });
});