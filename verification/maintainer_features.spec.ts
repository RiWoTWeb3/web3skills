import { test, expect } from '@playwright/test';

test.describe('Maintainer Feature Enhancements', () => {
  test.beforeEach(async ({ page }) => {
    // Go to HomePage and accept policy
    await page.goto('http://localhost:3000/');
    const acceptButton = page.locator('button:has-text("I Understand and Accept")');
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  });

  test('HomePage features should be rendered correctly', async ({ page }) => {
    // Check Security Pulse
    await expect(page.locator('h3:has-text("Security Pulse")')).toBeVisible();
    await expect(page.locator('p:has-text("Safety Index")')).toBeVisible();

    // Check Daily Learning Streak
    await expect(page.locator('h3:has-text("Learning Streak")')).toBeVisible();
    await expect(page.locator('p:has-text("Consecutive Days")')).toBeVisible();
  });

  test('Admin Panel features should be rendered correctly', async ({ page }) => {
    // Navigate to Admin Panel
    await page.goto('http://localhost:3000/#/notadmin');

    // Wait for Recharts components
    await page.waitForTimeout(2000);

    // Check Skill Market Value Chart
    await expect(page.locator('h3:has-text("Skill Market Value (Avg USD)")')).toBeVisible();

    // Check System Capacity Monitor
    await expect(page.locator('h3:has-text("System Capacity Monitor")')).toBeVisible();
    await expect(page.locator('p:has-text("Aggregate Quota Usage")')).toBeVisible();
  });
});
