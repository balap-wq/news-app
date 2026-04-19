import { jest } from '@jest/globals';

let axios;
let fetchTopHeadlines;
let NewsApiRateLimitError;
let NewsApiAuthError;
let NewsApiFetchError;

// ✅ Mock axios first
jest.unstable_mockModule('axios', () => ({
  default: {
    get: jest.fn(),
  },
}));

// ✅ Mock logger to suppress Winston logs during tests
jest.unstable_mockModule('../src/config/logger.js', () => ({
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

beforeAll(async () => {
  // ✅ Import after mocks
  axios = (await import('axios')).default;

  const service = await import('../src/services/newsApiService.js');

  fetchTopHeadlines = service.fetchTopHeadlines;
  NewsApiRateLimitError = service.NewsApiRateLimitError;
  NewsApiAuthError = service.NewsApiAuthError;
  NewsApiFetchError = service.NewsApiFetchError;
});

describe('fetchTopHeadlines', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Success
  it('should return articles array on success', async () => {
    const mockArticles = [{ title: 'News 1' }];

    axios.get.mockResolvedValue({
      data: { status: 'ok', articles: mockArticles },
    });

    const result = await fetchTopHeadlines({});
    expect(result).toEqual(mockArticles);
  });

  // ✅ 429
  it('should throw rate limit error', async () => {
    axios.get.mockRejectedValue({
      response: { status: 429 },
    });

    await expect(fetchTopHeadlines({})).rejects.toThrow(NewsApiRateLimitError);
  });

  // ✅ 401
  it('should throw auth error', async () => {
    axios.get.mockRejectedValue({
      response: { status: 401 },
    });

    await expect(fetchTopHeadlines({})).rejects.toThrow(NewsApiAuthError);
  });

  // ✅ Network
  it('should throw fetch error', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(fetchTopHeadlines({})).rejects.toThrow(NewsApiFetchError);
  });
});
