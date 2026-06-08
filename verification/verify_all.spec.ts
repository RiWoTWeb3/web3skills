import { test, expect } from '@playwright/test';

test('Verify latest features and daily update', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Handle Policy Modal
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Daily Learning Streak
  await expect(page.locator('h3:has-text("Learning Streak")')).toBeVisible();

  // Verify Project Ideas
  await expect(page.locator('h3:has-text("Project Ideas")')).toBeVisible();
  await expect(page.locator('text=Decentralized Stablecoin')).toBeVisible();

  // Verify Intel Feed Link
  await page.click('text=Intel Feed');
  await expect(page).toHaveURL(/.*news/);
  await expect(page.locator('text=Ethereum Pectra Upgrade')).toBeVisible();

  // Verify Interview Prep
  await page.click('text=Interview');
  await expect(page).toHaveURL(/.*interview-prep/);
  await expect(page.locator('text=How does the Ethereum Gas mechanism work?')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/final_verification.png', fullPage: true });
});
