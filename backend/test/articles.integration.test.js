import request from 'supertest';
import { jest } from '@jest/globals';

const mockFindArticleById = jest.fn();

await jest.unstable_mockModule('../src/repositories/articleRepository.js', () => ({
  findArticleById: mockFindArticleById,
}));

const { default: app } = await import('../src/app.js');

describe('GET /api/articles/:id Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test 1 — Success with plain fields
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

  // ✅ Test 2 — Success with snake_case fields transformed to camelCase
  it('should return 200 with camelCase transformed fields', async () => {
    mockFindArticleById.mockResolvedValue({
      id: 1,
      title: 'Test Article',
      url_to_image: 'https://example.com/image.jpg', // ← snake_case
      source_name: 'BBC News',                        // ← snake_case
      published_at: '2026-01-01',                     // ← snake_case
    });

    const response = await request(app).get('/api/articles/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('urlToImage', 'https://example.com/image.jpg'); // ✅ camelCase
    expect(response.body).toHaveProperty('sourceName', 'BBC News');                       // ✅ camelCase
    expect(response.body).toHaveProperty('publishedAt', '2026-01-01');                    // ✅ camelCase
  });

  // ✅ Test 3 — Not found
  it('should return 404 if article not found', async () => {
    mockFindArticleById.mockResolvedValue(null);

    const response = await request(app).get('/api/articles/9999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Article not found');
    expect(response.body).toHaveProperty('articleId', 9999); // ✅ Zod coerced to number
  });

  // ✅ Test 4 — Invalid ID now handled by Zod middleware
  it('should return 400 if id is not a valid number', async () => {
    const response = await request(app).get('/api/articles/abc');

    expect(response.statusCode).toBe(400);
    // ✅ Zod middleware returns this format now:
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Invalid route parameters');
    expect(response.body.errors).toHaveProperty('id'); // ✅ id field has error
  });

  // ✅ Test 5 — No id segment
  it('should return 404 if no id segment in path', async () => {
    const response = await request(app).get('/api/articles/');

    expect(response.statusCode).toBe(404);
  });

  // ✅ Test 6 — DB error returns 500
  it('should return 500 on unexpected DB error', async () => {
    mockFindArticleById.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/api/articles/1');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal server error');
  });
});