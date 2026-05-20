import { test } from '@playwright/test';

test('capture screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1200 });

  // Admin Panel
  await page.goto('http://localhost:3000/#/notadmin');
  await page.click('button:has-text("I Understand and Accept")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification/admin_panel.png', fullPage: true });

  // News View
  await page.goto('http://localhost:3000/#/news');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification/news_view.png', fullPage: true });
});
