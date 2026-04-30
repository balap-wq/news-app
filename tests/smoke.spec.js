import { test, expect } from '@playwright/test';

test('Homepage loads and shows articles', async ({ page }) => {
  await page.goto('/');

  const articles = page.locator('[data-testid="article-card"]');

  // ✅ timeout is configured globally in playwright.config.js
  await expect(articles.first()).toBeVisible();
});

test('Navigate to article detail page', async ({ page }) => {
  await page.goto('/');

  const firstArticle = page.locator('[data-testid="article-card"]').first();

  // ✅ timeout is configured globally in playwright.config.js
  await expect(firstArticle).toBeVisible();

  await firstArticle.click();

  // ✅ Match your actual route
  await expect(page).toHaveURL(/article/);

 // Use REAL selector if testid not available
  await expect(page.locator('h1')).toBeVisible();
});
