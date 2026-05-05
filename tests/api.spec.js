import { test, expect } from '@playwright/test';

test('GET /api/headlines - should return list of articles', async ({
  request,
}) => {
  const res = await request.get('/api/headlines');

  // ✅ Check status first
  expect(res.status()).toBe(200);

  // ✅ Validate content-type BEFORE parsing
  const contentType = res.headers()['content-type'];
  expect(contentType).toContain('application/json');

  // ✅ Now safe to parse JSON
  const data = await res.json();
  const articles = Array.isArray(data) ? data : data.articles;

  expect(articles.length).toBeGreaterThan(0);
  expect(articles[0]).toHaveProperty('title');
});
