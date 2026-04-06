import { jest } from '@jest/globals';

const mockFindArticleById = jest.fn();

await jest.unstable_mockModule('../src/repositories/articleRepository.js', () => ({
  findArticleById: mockFindArticleById,
}));

// ✅ Mock logger to suppress Winston logs during tests
await jest.unstable_mockModule('../src/config/logger.js', () => ({
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

const { getArticleById } = await import('../src/controllers/articlesController.js');

describe('getArticleById Unit Tests', () => {
  let req, res;

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

    await getArticleById(req, res);

    expect(mockFindArticleById).toHaveBeenCalledWith(1);
    expect(mockFindArticleById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Article',
      description: 'Test Desc',
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

  // ✅ Test 3 — Zod already coerced id to number
  it('should call findArticleById with coerced number id', async () => {
    mockFindArticleById.mockResolvedValue(null);

    req.params = { id: 1 };

    await getArticleById(req, res);

    expect(mockFindArticleById).toHaveBeenCalledWith(1);
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
      url_to_image: 'https://example.com/image.jpg',
      source_name: 'BBC News',
      published_at: '2026-01-01',
    });

    await getArticleById(req, res);

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