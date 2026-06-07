import { test, expect } from '@playwright/test';

test('Capture screenshots of new features', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Handle Policy Modal
  const modalButton = page.locator('button:has-text("I Understand and Accept")');
  if (await modalButton.isVisible()) {
    await modalButton.click();
  }

  // Home Page
  await page.screenshot({ path: 'verification_screenshots/homepage.png', fullPage: true });

  // Interview Prep
  await page.click('text=Interview');
  await page.waitForURL('**/interview-prep');
  await page.screenshot({ path: 'verification_screenshots/interview_prep.png', fullPage: true });

  // Admin Panel (notadmin)
  await page.goto('http://localhost:3000/#/notadmin');
  await page.waitForTimeout(2000); // Wait for charts to animate
  await page.screenshot({ path: 'verification_screenshots/admin_panel.png', fullPage: true });
});
