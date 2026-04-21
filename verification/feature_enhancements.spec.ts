import { test, expect } from '@playwright/test';

test.describe('RiWoT Feature Enhancements Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Set viewport to ensure visibility
    await page.setViewportSize({ width: 1280, height: 720 });
    // Click somewhere to ensure focus
    await page.mouse.click(0, 0);
  });

  test('Skill Market Value Chart is rendered', async ({ page }) => {
    await page.goto('http://localhost:3000/#/notadmin');
    const chartHeading = page.locator('h3:has-text("Skill Market Value (Avg USD)")');
    await expect(chartHeading).toBeVisible();

    // Check for some skill labels that should be in the top 10 (based on today's high-paying Solana job)
    const solanaLabel = page.locator('text=Solana').first();
    await expect(solanaLabel).toBeVisible();
  });

  test('Command Palette opens with Ctrl+K', async ({ page }) => {
    // Try multiple ways to trigger if standard press fails
    await page.keyboard.down('Control');
    await page.keyboard.press('k');
    await page.keyboard.up('Control');

    // Wait for the command palette to appear
    const palette = page.locator('div:has-text("Navigation")').last();
    await expect(palette).toBeVisible({ timeout: 10000 });

    const input = page.getByPlaceholder('Search system registry...');
    await expect(input).toBeVisible();

    // Test navigation
    await input.fill('Job Board');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/.*jobs/);
  });
});
