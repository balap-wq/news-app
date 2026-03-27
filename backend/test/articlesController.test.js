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
      params: { id: '1' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

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

  it('should return 400 if id is not a valid number', async () => {
    req.params = { id: 'abc' };

    await getArticleById(req, res);

    expect(mockFindArticleById).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid article ID',
    });
  });

  it('should return 500 on unexpected error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockFindArticleById.mockRejectedValue(new Error('DB error'));

    await getArticleById(req, res);

    expect(mockFindArticleById).toHaveBeenCalledWith(1);
    expect(mockFindArticleById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal server error',
    });

    console.error.mockRestore();
  });
});
