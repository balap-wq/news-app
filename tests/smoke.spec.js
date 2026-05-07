import { test, expect } from '@playwright/test';

test('Homepage loads and shows articles', async ({ page }) => {
  // Mock /auth/me to simulate logged-in user
  await page.route('**/auth/me', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
        }
      })
    });
  });

  await page.goto('/');

  const articles = page.locator('[data-testid="article-card"]');
  await expect(articles.first()).toBeVisible();
});

test('Navigate to article detail page', async ({ page }) => {
  // Mock /auth/me to simulate logged-in user
  await page.route('**/auth/me', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
        }
      })
    });
  });

  await page.goto('/');

  const firstArticle = page.locator('[data-testid="article-card"]').first();
  await expect(firstArticle).toBeVisible();

  await firstArticle.click();

  await expect(page).toHaveURL(/article/);
});