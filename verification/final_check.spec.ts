import { test, expect } from '@playwright/test';

test.use({ launchOptions: { executablePath: '/usr/bin/google-chrome' } });

test.describe('RiWoT Platform Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const acceptButton = page.locator('button:has-text("I Understand and Accept")');
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  });

  test('Daily Data Update Verification', async ({ page }) => {
    await page.goto('http://localhost:3000/#/news');
    // Check for today's data (2026-06-20/21)
    await expect(page.locator('text=Force Bridge Announces Sunset').first()).toBeVisible();
    await expect(page.locator('text=ALEX Protocol Exploited').first()).toBeVisible();
  });

  test('Admin Panel Enhancements Verification', async ({ page }) => {
    await page.goto('http://localhost:3000/#/notadmin');

    // Check for Heatmap
    const heatmap = page.locator('h3:has-text("Key Health Heatmap")');
    await expect(heatmap).toBeVisible();

    // Check for Terminal
    const terminal = page.locator('h3:has-text("System Intelligence Terminal")');
    await expect(terminal).toBeVisible();
  });

  test('Career Alignment Engine Verification', async ({ page }) => {
    await page.goto('http://localhost:3000/#/careers');
    const alignment = page.locator('text=% alignment').first();
    await expect(alignment).toBeVisible();
  });
});
