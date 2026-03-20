// Mock data for top headlines

export const mockTopHeadlines = {
  status: "ok",
  totalResults: 20,
  articles: [
    {
      source: { id: null, name: "Mock News" },
      author: "John Doe",
      title: "Breaking News 1",
      description: "This is a mock description for news 1",
      url: "https://example.com/news1",
      urlToImage: "https://via.placeholder.com/150",
      publishedAt: "2026-03-20T10:00:00Z",
      content: "Full content of mock news 1",
    },
    {
      source: { id: null, name: "Mock News" },
      author: "Jane Smith",
      title: "Breaking News 2",
      description: "This is a mock description for news 2",
      url: "https://example.com/news2",
      urlToImage: "https://via.placeholder.com/150",
      publishedAt: "2026-03-20T11:00:00Z",
      content: "Full content of mock news 2",
    },
    {
      source: { id: null, name: "Mock News" },
      author: "Alex",
      title: "Breaking News 3",
      description: "This is a mock description for news 3",
      url: "https://example.com/news3",
      urlToImage: "https://via.placeholder.com/150",
      publishedAt: "2026-03-20T12:00:00Z",
      content: "Full content of mock news 3",
    },
  ],
};

// Mock function (simulate API call)
export const fetchTopHeadlinesMock = async ({
  pageSize = 10,
  page = 1,
}) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedArticles = mockTopHeadlines.articles.slice(start, end);

  return {
    status: "ok",
    totalResults: mockTopHeadlines.totalResults,
    articles: paginatedArticles,
  };
};