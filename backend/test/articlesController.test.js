import { jest } from '@jest/globals';

const mockFindArticleById = jest.fn();

await jest.unstable_mockModule('../src/repositories/articleRepository.js', () => ({
  findArticleById: mockFindArticleById,
}));

const { getArticleById } = await import('../src/controllers/articlesController.js');

describe('getArticleById Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: 1 }, // ✅ number not string — Zod already coerced it
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

    await getArticleById(req, res);

    expect(mockFindArticleById).toHaveBeenCalledWith(1);
    expect(mockFindArticleById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Article',
      description: 'Test Desc',
      // ✅ snakeToCamel won't change these since no underscores
    });
  });

  // ✅ Test 2 — Not found
  it('should return 404 if article not found', async () => {
    mockFindArticleById.mockResolvedValue(null);

    await getArticleById(req, res);

    expect(mockFindArticleById).toHaveBeenCalledWith(1);
    expect(mockFindArticleById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Article not found',
      articleId: 1,
    });
  });

  // ✅ Test 3 — Invalid ID now handled by Zod middleware
  // Controller never receives invalid id anymore
  // So we test that controller trusts Zod's coerced number
  it('should call findArticleById with coerced number id', async () => {
    mockFindArticleById.mockResolvedValue(null);

    req.params = { id: 1 }; // ✅ Zod already coerced to number

    await getArticleById(req, res);

    expect(mockFindArticleById).toHaveBeenCalledWith(1); // ✅ number not string
  });

  // ✅ Test 4 — DB error
  it('should return 500 on unexpected error', async () => {
    mockFindArticleById.mockRejectedValue(new Error('DB error'));

    await getArticleById(req, res);

    expect(mockFindArticleById).toHaveBeenCalledWith(1);
    expect(mockFindArticleById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal server error',
    });
  });

  // ✅ Test 5 — snake_case to camelCase transformation
  it('should transform snake_case keys to camelCase', async () => {
    mockFindArticleById.mockResolvedValue({
      id: 1,
      title: 'Test Article',
      url_to_image: 'https://example.com/image.jpg', // ← snake_case
      source_name: 'BBC News',                        // ← snake_case
      published_at: '2026-01-01',                     // ← snake_case
    });

    await getArticleById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Article',
      urlToImage: 'https://example.com/image.jpg', // ✅ camelCase
      sourceName: 'BBC News',                       // ✅ camelCase
      publishedAt: '2026-01-01',                    // ✅ camelCase
    });
  });
});
