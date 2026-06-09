import { test } from '@playwright/test';

test('capture screenshots', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Accept policy
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }
  await page.screenshot({ path: 'verification_screenshots/homepage.png', fullPage: true });

  await page.goto('http://localhost:3000/#/interview-prep');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification_screenshots/interview_prep.png', fullPage: true });

  await page.goto('http://localhost:3000/#/careers');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification_screenshots/careers_analytics.png', fullPage: true });
});
