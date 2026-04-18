import { test, expect } from '@playwright/test';

test.describe('Admin Panel Evolution and Daily Updates', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/#/notadmin');

    const modalButton = page.locator('button:has-text("I Understand")');
    try {
      await modalButton.waitFor({ state: 'visible', timeout: 5000 });
      await modalButton.click();
    } catch (e) {}
    await page.waitForLoadState('networkidle');
  });

  test('should display the new System Evolution Roadmap', async ({ page }) => {
    const roadmapHeading = page.locator('h3:has-text("System Evolution Roadmap")');
    await expect(roadmapHeading).toBeVisible({ timeout: 10000 });

    await expect(page.locator('text=Virtual Rate Limiter')).toBeVisible();
    await expect(page.locator('text=Agentic Ensemble')).toBeVisible();
  });

  test('should trigger an autonomous scan and update logs', async ({ page }) => {
    const triggerButton = page.locator('button:has-text("Trigger Autonomous Scan")');
    await expect(triggerButton).toBeVisible();

    await triggerButton.dispatchEvent('click');

    // Search for the specific message we found in system_logs.json
    const logEntry = page.locator('text=Autonomous scan cycle triggered by Admin override.').first();
    await expect(logEntry).toBeVisible({ timeout: 15000 });
  });

  test('should capture screenshots of the updated UI', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'verification/admin_panel_final.png' });

    await page.goto('http://localhost:3000/#/jobs');
    await page.waitForSelector('text=Security Engineering Lead', { timeout: 10000 });
    await page.screenshot({ path: 'verification/jobs_update_final.png' });
  });
});
