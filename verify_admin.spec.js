const { test, expect } = require('@playwright/test');

test('Verify Admin Panel dynamic logs', async ({ page }) => {
  await page.goto('http://localhost:3000/#/notadmin');

  const modalButton = page.locator('button:has-text("I Understand and Accept")');
  if (await modalButton.isVisible()) {
    await modalButton.click();
  }

  await expect(page.locator('h1').nth(1)).toContainText('SYSTEM_MONITOR.CORE');
  const logsHeading = page.locator('h3:has-text("System Intelligence Logs")');
  await expect(logsHeading).toBeVisible();

  await expect(page.locator('span:has-text("Indexed 3 new remote roles from Anza, Spearbit, and Monad Labs.")').first()).toBeVisible();
  await expect(page.locator('span:has-text("Web3 Data Update [2026-04-11] complete.")').first()).toBeVisible();

  await page.setViewportSize({ width: 1280, height: 1200 });
  await page.screenshot({ path: '/home/jules/verification/admin_panel_logs.png' });
});
