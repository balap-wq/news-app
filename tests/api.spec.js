import { test, expect } from '@playwright/test';

test('GET /api/headlines - pipeline check', async ({ request }) => {
  const res = await request.get('http://localhost:5000/api/headlines');

  // ✅ API should respond
  expect(res.status()).toBe(200);

  const data = await res.json();

  // ✅ Handle both response formats
  const articles = Array.isArray(data) ? data : data.articles;

  // ✅ Validate data exists
  expect(articles.length).toBeGreaterThan(0);

  // ✅ Validate structure
  expect(articles[0]).toHaveProperty('title');
});