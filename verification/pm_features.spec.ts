import { test, expect } from '@playwright/test';

test.describe('RiWoT PM Features Verification', () => {
  test('Verify Homepage Features', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Check Daily Learning Streak
    const streak = page.locator('h3:has-text("Daily Learning Streak")');
    await expect(streak).toBeVisible();

    // Check Security Pulse - using a more specific selector to avoid duplicates
    const safetyIndex = page.locator('p:has-text("Safety Index")').first();
    await expect(safetyIndex).toBeVisible();

    await page.screenshot({ path: 'verification/homepage_pm_features.png', fullPage: true });
  });

  test('Verify Admin Panel Chart', async ({ page }) => {
    await page.goto('http://localhost:3000/#/notadmin');

    // Wait for the chart to render
    await page.waitForTimeout(5000);

    const chartTitle = page.locator('text=Skill Market Value (Avg USD)');
    await expect(chartTitle).toBeVisible();

    await page.screenshot({ path: 'verification/admin_panel_chart.png', fullPage: true });
  });
});
