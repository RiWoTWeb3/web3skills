import { test, expect } from '@playwright/test';

test('capture screenshots', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000); // Wait for content
  await page.screenshot({ path: 'verification/homepage.png', fullPage: true });

  await page.goto('http://localhost:3000/#/admin');
  await page.waitForTimeout(5000); // Wait for charts and animations
  // Handle potential modal
  const modalButton = page.getByRole('button', { name: /I Understand and Accept/i });
  if (await modalButton.isVisible()) {
    await modalButton.click();
  }
  await page.screenshot({ path: 'verification/admin_panel.png', fullPage: true });
});
