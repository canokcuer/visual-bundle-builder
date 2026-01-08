// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for Cyrasoul Bundle Builder E2E tests
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  use: {
    // Base URL for your Shopify store (update with your actual store URL)
    baseURL: process.env.SHOPIFY_STORE_URL || 'https://cyrasoul.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry'
  },

  projects: [
    // Mobile first - test on mobile devices first
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] }
    },
    // Desktop browsers
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] }
    }
  ],

  // Optionally run a local server before tests
  // webServer: {
  //   command: 'shopify theme dev',
  //   url: 'http://localhost:9292',
  //   reuseExistingServer: !process.env.CI,
  // },
});
