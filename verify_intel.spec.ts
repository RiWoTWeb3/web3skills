import { test, expect } from '@playwright/test';

test('Capture Intel Section', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.setViewportSize({ width: 1280, height: 1000 });

  // Dismiss Policy Modal
  try {
    const acceptButton = page.getByRole('button', { name: 'I Understand and Accept' });
    await acceptButton.waitFor({ timeout: 5000 });
    await acceptButton.click();
  } catch (e) {}

  // Scroll to Intel Section
  const intelSection = page.locator('text=Latest System Intel');
  await intelSection.scrollIntoViewIfNeeded();

  await expect(page.locator('text=SYNC_OK // 2026-04-06')).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/homepage_intel_section.png' });
});
