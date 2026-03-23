import { jest } from '@jest/globals';

// Mock functions
const mockFindTopHeadlines = jest.fn();
const mockCountArticles = jest.fn();

// Mock SERVICE
jest.unstable_mockModule('../src/services/articleService.js', () => ({
  findTopHeadlines: mockFindTopHeadlines,
  countArticles: mockCountArticles,
}));

// Import AFTER mock
const { getHeadlines } = await import('../src/controllers/headlinesController.js');

describe('GET /api/headlines', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('pagination logic works correctly', async () => {
    mockFindTopHeadlines.mockResolvedValue([
      { title: 'News 1', author: 'A' },
      { title: 'News 2', author: 'B' },
    ]);

    mockCountArticles.mockResolvedValue(20);

    const req = {
      query: { page: 2, limit: 2 },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getHeadlines(req, res);

    expect(mockFindTopHeadlines).toHaveBeenCalledWith({
      limit: 2,
      offset: 2,
    });

    expect(res.json).toHaveBeenCalledWith({
      data: [
        { title: 'News 1', author: 'A' },
        { title: 'News 2', author: 'B' },
      ],
      total: 20,
      page: 2,
      limit: 2,
      totalPages: 10,
    });
  });
});
