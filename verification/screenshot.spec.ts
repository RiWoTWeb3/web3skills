import { test, expect } from '@playwright/test';

test('capture screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1200 });

  // HomePage
  await page.goto('http://localhost:3000');
  await page.click('button:has-text("I Understand and Accept")').catch(() => {});
  await page.screenshot({ path: 'homepage_screenshot.png' });

  // News Page
  await page.goto('http://localhost:3000/#/news');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'news_screenshot.png' });

  // Jobs Page
  await page.goto('http://localhost:3000/#/jobs');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'jobs_screenshot.png' });
});
