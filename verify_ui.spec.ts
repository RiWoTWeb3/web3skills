import { test, expect } from '@playwright/test';

test('Verify Admin Panel and News Feed', async ({ page }) => {
  // Start server (implicitly assumed to be running on port 3000)
  await page.goto('http://localhost:3000/#/news');

  // Dismiss Policy Modal if it exists
  const policyButton = page.locator('button:has-text("I Understand and Accept")');
  if (await policyButton.isVisible()) {
    await policyButton.click();
  }

  // Check if today's news is present
  await expect(page.locator('text=Ethereum Pectra Upgrade Devnet-6 Launch')).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/news_feed.png' });

  // Navigate to Admin Panel
  await page.goto('http://localhost:3000/#/notadmin');

  // Login
  await page.fill('input[type="password"]', 'antigravity2025');
  await page.click('button:has-text("INITIALIZE_SESSION")');

  // Verify dashboard
  await expect(page.locator('text=Virtual Rate Limiter Hub')).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/admin_dashboard.png' });
});
