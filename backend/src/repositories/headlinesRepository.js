// Repository layer for headlines
// Normally this file talks to the database
// For now we return mock data so unit tests work

export async function findTopHeadlines({ limit, offset }) {

  const articles = [
    {
      id: 1,
      title: "Breaking News 1",
      description: "Sample description",
      urlToImage: null,
      sourceName: "BBC",
      publishedAt: "2026-03-10"
    },
    {
      id: 2,
      title: "Breaking News 2",
      description: "Sample description",
      urlToImage: null,
      sourceName: "CNN",
      publishedAt: "2026-03-10"
    }
  ];

  // simulate pagination
  return articles.slice(offset, offset + limit);
}


export async function countArticles() {
  // normally this counts rows in database
  return 20;
}