import { test, expect } from '@playwright/test';

test('Daily data and Admin Panel analytics', async ({ page }) => {
  test.setTimeout(60000);

  // Set viewport for Admin Panel
  await page.setViewportSize({ width: 1280, height: 1200 });

  // Navigate to Home
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  // Handle Policy Modal
  const policyButton = page.getByRole('button', { name: /I Understand and Accept/i });
  if (await policyButton.isVisible()) {
    await policyButton.click();
  }

  // Verify daily news entry on HomePage
  await expect(page.getByText('Chainlink CCIP Expands Cross-Chain Interoperability to Major L2s')).toBeVisible();

  // Navigate to Admin Panel
  await page.goto('http://localhost:3000/#/notadmin');

  // Wait for Recharts to load
  await page.waitForTimeout(5000);

  // Verify Skill Market Value Chart title
  await expect(page.getByText('Skill Market Value (Avg USD)')).toBeVisible();

  // Verify that the chart rendered something (check for bar rectangles or labels)
  const chartContainer = page.locator('.recharts-responsive-container').first();
  await expect(chartContainer).toBeVisible();

  // Capture screenshot for visual verification
  await page.screenshot({ path: 'verification-screenshot.png', fullPage: true });
});
