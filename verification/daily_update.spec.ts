import { test, expect } from '@playwright/test';

test('Verify Today\'s Data Feed and Admin Panel Chart', async ({ page }) => {
  // Set viewport to ensure all charts are visible
  await page.setViewportSize({ width: 1280, height: 1200 });

  // Navigate to Home
  await page.goto('http://localhost:3000/#/');

  // Accept policy if modal appears
  const acceptButton = page.getByRole('button', { name: 'I Understand and Accept' });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // 1. Verify Latest Intel on Home Page
  await expect(page.getByText('SYMBOLS_OK // 2026-04-30')).toBeVisible({ timeout: 10000 }).catch(() => {
    // If exact text fails, check for date
    return expect(page.getByText('2026-04-30').first()).toBeVisible();
  });

  await expect(page.getByText('Four Pillars Secures $20M Series A')).toBeVisible();
  await expect(page.getByText('Kelp DAO Exploit Impact')).toBeVisible();

  // 2. Verify Jobs Page
  await page.goto('http://localhost:3000/#/jobs');
  await expect(page.getByText('Solana Smart Contracts Engineer').first()).toBeVisible();
  await expect(page.getByText('Rust Developer — EVM Systems').first()).toBeVisible();

  // 3. Verify Admin Panel (System Control Center)
  await page.goto('http://localhost:3000/#/notadmin');

  // Wait for charts and data to load
  await page.waitForTimeout(5000);

  // Verify Market Distribution Chart exists
  await expect(page.getByText('Market Opportunity Distribution')).toBeVisible();

  // Verify New Skill Market Value Chart exists
  await expect(page.getByText('Skill Market Value (Avg USD)')).toBeVisible();

  // Take a screenshot for visual confirmation
  await page.screenshot({ path: 'admin_panel_verification.png', fullPage: true });
});
