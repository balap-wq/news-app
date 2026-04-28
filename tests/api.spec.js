import { test, expect } from '@playwright/test';

test('GET /api/headlines - pipeline check', async ({ request }) => {
  const url = `http://localhost:5000/api/headlines`;

  const res = await request.get(url);

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
