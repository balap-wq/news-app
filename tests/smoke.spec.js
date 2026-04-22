import { test, expect } from '@playwright/test';

test('Homepage loads and shows articles', async ({ page }) => {
  await page.goto('/');

  const articles = page.locator('[data-testid="article-card"]');

  // ✅ Wait for data to render (IMPORTANT)
  await expect(articles.first()).toBeVisible({ timeout: 15000 });
});

test('Navigate to article detail page', async ({ page }) => {
  await page.goto('/');

  const firstArticle = page.locator('[data-testid="article-card"]').first();

  // ✅ Ensure element is ready before click
  await expect(firstArticle).toBeVisible({ timeout: 15000 });

  await firstArticle.click();

  // ✅ Match your actual route
  await expect(page).toHaveURL(/article/);
});