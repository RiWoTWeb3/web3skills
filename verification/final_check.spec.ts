import { test, expect } from '@playwright/test';

test.describe('RiWoT Platform Verification - Daily Update & Features', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport for charts
    await page.setViewportSize({ width: 1280, height: 1200 });
    // Navigate to the app and handle policy modal
    await page.goto('http://localhost:3000');
    const acceptButton = page.locator('button:has-text("I Understand and Accept")');
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  });

  test('Verify Daily Data Update (2026-05-24)', async ({ page }) => {
    await page.goto('http://localhost:3000/#/news');
    // Check for today's date in feed
    await expect(page.locator('text=2026-05-24').first()).toBeVisible();
    // Check for Echo Protocol news
    await expect(page.locator('text=Echo Protocol').first()).toBeVisible();

    await page.goto('http://localhost:3000/#/jobs');
    // Check for RareTalent jobs
    await expect(page.locator('text=RareTalent').first()).toBeVisible();
  });

  test('Verify Daily Learning Streak Feature', async ({ page }) => {
    await page.goto('http://localhost:3000/#/');
    // Check for Learning Streak component
    const streak = page.locator('h3:has-text("Learning Streak")');
    await expect(streak).toBeVisible();
    // Should show "1 Days" as it's the first visit today
    await expect(page.locator('text=1 Days')).toBeVisible();
  });

  test('Verify Admin Panel Content', async ({ page }) => {
    await page.goto('http://localhost:3000/#/notadmin');
    // Check for chart title
    const chartTitle = page.locator('h3:has-text("Skill Market Value (Avg USD)")');
    await expect(chartTitle).toBeVisible();

    // Verify system notice
    await expect(page.locator('text=SYSTEM NOTICE')).toBeVisible();
  });

  test('Verify Manual Scan Trigger', async ({ page }) => {
    await page.goto('http://localhost:3000/#/notadmin');
    const triggerButton = page.locator('button:has-text("Trigger Manual Scan")');
    await expect(triggerButton).toBeVisible();

    await triggerButton.click();
    // Should show scanning state
    await expect(page.locator('text=SCANNING...')).toBeVisible();

    // Wait for it to complete and check terminal logs
    await page.waitForTimeout(3000);
    const logEntry = page.locator('text=Autonomous scan cycle triggered by Admin override.').first();
    await expect(logEntry).toBeVisible();
  });
});
