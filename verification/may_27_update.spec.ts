import { test, expect } from '@playwright/test';

test.describe('May 27 Update Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Handle Policy Modal if it appears
    const modalButton = page.locator('button:has-text("I Understand and Accept")');
    if (await modalButton.isVisible()) {
      await modalButton.click();
    }
  });

  test('Homepage Features: Streak and Security Pulse', async ({ page }) => {
    // Check Daily Learning Streak
    const streak = page.locator('h3:has-text("Learning Streak")');
    await expect(streak).toBeVisible();

    // Check Security Pulse
    const pulse = page.locator('h3:has-text("Security Pulse")');
    await expect(pulse).toBeVisible();
    const safetyIndex = page.locator('p:has-text("Safety Index")');
    await expect(safetyIndex).toBeVisible();
  });

  test('Daily Feed Data: 2026-05-27', async ({ page }) => {
    await page.goto('http://localhost:3000/#/news');
    // Check for today's news
    await expect(page.locator('text=2026-05-27').first()).toBeVisible();
    await expect(page.locator('text=Monad Devnet V4').first()).toBeVisible();

    await page.goto('http://localhost:3000/#/jobs');
    await expect(page.locator('text=Unstoppable Finance').first()).toBeVisible();
  });

  test('Admin Panel: Skill Market Value Chart', async ({ page }) => {
    await page.goto('http://localhost:3000/#/notadmin');

    // Wait for chart to render
    await page.waitForTimeout(2000);

    const chartTitle = page.locator('h3:has-text("Skill Market Value (Avg USD)")');
    await expect(chartTitle).toBeVisible();

    // Check for some skill labels in the chart
    await expect(page.locator('text=Solana').first()).toBeVisible();
    await expect(page.locator('text=Rust').first()).toBeVisible();
  });
});
