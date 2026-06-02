import { test, expect } from '@playwright/test';

test('capture new features', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Accept policy
  const acceptBtn = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
  }
  await page.screenshot({ path: 'verification_screenshots/homepage_new_v2.png', fullPage: true });

  await page.goto('http://localhost:3000/#/careers');
  await page.waitForTimeout(3000); // Wait for charts
  await page.screenshot({ path: 'verification_screenshots/careers_analytics.png', fullPage: true });
});
