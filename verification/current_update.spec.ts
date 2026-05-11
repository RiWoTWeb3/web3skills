import { test, expect } from '@playwright/test';

test.describe('RiWoT Platform Current Update Verification', () => {
  test('Daily Data Update 2026-05-11 Verification', async ({ page }) => {
    await page.goto('http://localhost:3000/#/news');

    // Handle policy modal
    const policyButton = page.locator('button:has-text("I Understand and Accept")');
    if (await policyButton.isVisible()) {
      await policyButton.click();
    }

    // Check for today's data (2026-05-11)
    const newsItem = page.locator('text=2026-05-11').first();
    await expect(newsItem).toBeVisible();

    const solvNews = page.locator('text=Solv Protocol').first();
    await expect(solvNews).toBeVisible();

    await page.goto('http://localhost:3000/#/jobs');
    const rustJob = page.locator('text=Rust Developer').first();
    await expect(rustJob).toBeVisible();
  });

  test('Skill Market Value Chart Verification', async ({ page }) => {
    await page.goto('http://localhost:3000/#/notadmin');

    // Handle policy modal
    const policyButton = page.locator('button:has-text("I Understand and Accept")');
    if (await policyButton.isVisible()) {
      await policyButton.click();
    }

    // Check for Skill Market Value Chart
    const chartTitle = page.locator('h3:has-text("Skill Market Value (Avg USD)")');
    await expect(chartTitle).toBeVisible();

    // Set a large viewport to ensure all charts are rendered
    await page.setViewportSize({ width: 1280, height: 2000 });

    // Check if chart rendered
    const chartContainer = page.locator('div:has(> h3:has-text("Skill Market Value (Avg USD)"))').first();
    await expect(chartContainer).toBeVisible();

    // Wait for Recharts to animate/render
    await page.waitForTimeout(5000);

    await page.screenshot({ path: 'verification/screenshots/admin_panel_updated.png', fullPage: true });
  });
});
