import { test, expect } from '@playwright/test';

test('Verify new UI components on homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Handle Policy Modal
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Daily Learning Streak
  await expect(page.locator('h3:has-text("Learning Streak")')).toBeVisible();
  await expect(page.locator('text=/Days/')).toBeVisible();

  // Verify Security Pulse
  await expect(page.locator('h3:has-text("Security Pulse")')).toBeVisible();
  await expect(page.locator('text=/Safety Index/')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/homepage_new_features.png', fullPage: true });
});

test('Verify new Admin charts', async ({ page }) => {
  await page.goto('http://localhost:3000/#/notadmin');

  // Handle Policy Modal if it appears
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Wait for charts to load
  await page.waitForTimeout(5000);

  // Verify Market Opportunity Distribution
  await expect(page.locator('h3:has-text("Market Opportunity Distribution")')).toBeVisible();

  // Verify Skill Market Value
  await expect(page.locator('h3:has-text("Skill Market Value (Avg USD)")')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/admin_new_charts.png', fullPage: true });
});
