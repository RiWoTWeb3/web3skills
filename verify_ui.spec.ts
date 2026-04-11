import { test, expect } from '@playwright/test';

test('Verify NewsView and Intel Chart', async ({ page }) => {
  await page.goto('http://localhost:3000/#/news');
  await page.setViewportSize({ width: 1280, height: 1000 });

  // Dismiss Policy Modal
  try {
    const acceptButton = page.getByRole('button', { name: 'I Understand and Accept' });
    await acceptButton.waitFor({ timeout: 5000 });
    await acceptButton.click();
  } catch (e) {}

  // Check for the chart title
  const chartTitle = page.locator('text=Intel Distribution');
  await expect(chartTitle).toBeVisible();

  // Check for the new intel items
  await expect(page.locator('text=Monad Devnet Phase 1 Live')).toBeVisible();
  await expect(page.locator('text=Ethereum L2 TVL Reaches New All-Time High')).toBeVisible();
  await expect(page.locator('text=Berry Protocol Oracle Exploit: $2.1M Lost')).toBeVisible();

  await page.screenshot({ path: '/home/jules/verification/newsview_with_chart.png' });
});

test('Verify HomePage Sync Status', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.setViewportSize({ width: 1280, height: 1000 });

  // Dismiss Policy Modal if it reappears (hash routing might trigger it)
  try {
    const acceptButton = page.getByRole('button', { name: 'I Understand and Accept' });
    if (await acceptButton.isVisible()) {
        await acceptButton.click();
    }
  } catch (e) {}

  // Scroll to Intel Section
  const intelSection = page.locator('text=Latest System Intel');
  await intelSection.scrollIntoViewIfNeeded();

  await expect(page.locator('text=SYNC_OK // 2026-04-11')).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/homepage_sync_ok.png' });
});
