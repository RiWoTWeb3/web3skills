import { test, expect } from '@playwright/test';

test('Verify HomePage and Admin Panel Updates', async ({ page }) => {
  // Go to HomePage
  await page.goto('http://localhost:3000/');

  // Set viewport for consistent screenshots
  await page.setViewportSize({ width: 1280, height: 720 });

  // Dismiss Policy Modal if it appears
  try {
    const acceptButton = page.getByRole('button', { name: 'I Understand and Accept' });
    await acceptButton.waitFor({ timeout: 5000 });
    await acceptButton.click();
  } catch (e) {
    console.log('Policy modal did not appear or already accepted');
  }

  // Verify Freshness Indicator on HomePage
  const freshnessIndicator = page.locator('text=SYNC_OK // 2026-04-11');
  await expect(freshnessIndicator).toBeVisible();
  await expect(page.locator('text=SYNC_HEARTBEAT')).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/homepage_freshness.png' });

  // Go to Admin Panel
  await page.goto('http://localhost:3000/#/notadmin');

  // Verify Chart and Compact Logs in Admin Panel
  await page.waitForTimeout(2000); // Wait for data fetching
  const chartTitle = page.locator('text=Sync Volume Trend');
  await expect(chartTitle).toBeVisible();

  const liveAuditTitle = page.locator('text=Live Audit Stream');
  await expect(liveAuditTitle).toBeVisible();

  const kbCoverage = page.locator('text=KB Coverage');
  await expect(kbCoverage).toBeVisible();

  // Verify Bug Bounty Spotlight exists on Home
  await page.goto('http://localhost:3000/');
  const bugBountyTitle = page.locator('text=Bug Bounty Spotlight');
  await expect(bugBountyTitle).toBeVisible();

  await page.screenshot({ path: '/home/jules/verification/admin_panel_enhanced.png', fullPage: true });
});
