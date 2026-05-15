import { test, expect } from '@playwright/test';

test.describe('RiWoT Platform Daily Update & Features Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Handle policy modal
    const acceptButton = page.locator('button:has-text("I Understand and Accept")');
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  });

  test('Daily Data Update Verification', async ({ page }) => {
    await page.goto('http://localhost:3000/#/news');
    // Check for today's data (2026-05-15)
    const newsItem = page.locator('text=2026-05-15').first();
    await expect(newsItem).toBeVisible();

    const sonicNews = page.locator('text=Sonic Labs').first();
    await expect(sonicNews).toBeVisible();
  });

  test('SecurityPulse & DailyStreak Verification', async ({ page }) => {
    await page.goto('http://localhost:3000/#/');

    // Check for Security Pulse
    const securityPulse = page.locator('h3:has-text("Security Pulse")');
    await expect(securityPulse).toBeVisible();

    // Check for Daily Streak
    const dailyStreak = page.locator('h3:has-text("Daily Streak")');
    await expect(dailyStreak).toBeVisible();

    // Streak should be 1 for first visit
    const streakValue = page.locator('text=1').first();
    await expect(streakValue).toBeVisible();
  });

  test('Admin Panel Charts Verification', async ({ page }) => {
    await page.goto('http://localhost:3000/#/notadmin');

    // Check for Heatmap
    const heatmap = page.locator('h3:has-text("Key Health Heatmap")');
    await expect(heatmap).toBeVisible();

    // Check for Market Distribution
    const marketChart = page.locator('h3:has-text("Market Opportunity Distribution")');
    await expect(marketChart).toBeVisible();

    // Check for Skill Market Value
    const skillValueChart = page.locator('h3:has-text("Skill Market Value (Avg USD)")');
    await expect(skillValueChart).toBeVisible();
  });

  test('News View Distribution Chart Verification', async ({ page }) => {
    await page.goto('http://localhost:3000/#/news');

    const distributionText = page.locator('text=Intel Distribution');
    await expect(distributionText).toBeVisible();

    // Check for total logs card
    const totalLogs = page.locator('p:has-text("Total Logs")');
    await expect(totalLogs).toBeVisible();
  });
});
