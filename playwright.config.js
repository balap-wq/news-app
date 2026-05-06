import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  expect: {
    timeout: 15000, // ← max time for each expect() assertion (15s)
  },

  reporter: [['html'], ['list']],

  use: {
    baseURL: process.env.CORS_ORIGIN || 'http://localhost:5173',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  webServer: [
    {
      command: 'npm run dev --prefix backend',
      url: 'http://localhost:5000/api/health',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command: 'npm run dev --prefix frontend',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
  ],

  projects: [
    {
      name: 'chromium',
      testMatch: /tests\/smoke\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api',
      testMatch: /tests\/api\.spec\.js/,
      use: {
        baseURL: process.env.BACKEND_URL || 'http://localhost:5000',
      },
    },
  ],
});
