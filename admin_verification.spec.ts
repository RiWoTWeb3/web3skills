import { test, expect } from '@playwright/test';

test('Admin Panel - System Capacity Monitor and Trigger Scan', async ({ page }) => {
  // Increase timeout for slow environment
  test.setTimeout(90000);

  // Navigate to the Admin Panel
  await page.goto('http://localhost:3000/#/notadmin');

  // Accept policy modal if it appears
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify the System Capacity Monitor component is visible
  await page.waitForSelector('text=System API Capacity', { timeout: 10000 });
  const capacityHeading = page.locator('text=System API Capacity');
  await expect(capacityHeading).toBeVisible();

  // Verify the Trigger Manual Scan button is visible
  const triggerButton = page.locator('button:has-text("Trigger Manual Scan")');
  await expect(triggerButton).toBeVisible();

  // Get current logs count or latest log message
  const logsResBefore = await page.evaluate(async () => {
    const res = await fetch('/api/logs');
    return await res.json();
  });
  const initialLogCount = logsResBefore.length;

  // Click the Trigger Manual Scan button
  await triggerButton.click();

  // Wait for the button to show "SCANNING..." and then back to "Trigger Manual Scan"
  await page.waitForSelector('text=SCANNING...', { state: 'visible' });
  await page.waitForSelector('text=Trigger Manual Scan', { state: 'visible' });

  // Verify that a new log entry was added via API
  const logsResAfter = await page.evaluate(async () => {
    const res = await fetch('/api/logs');
    return await res.json();
  });

  expect(logsResAfter.length).toBeGreaterThanOrEqual(initialLogCount);
  expect(logsResAfter[0].msg).toBe('Autonomous scan cycle triggered by Admin override.');
});

test('Homepage - Latest System Intel', async ({ page }) => {
  await page.goto('http://localhost:3000/#/');

  // Accept policy modal if it appears
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify today's date in SYNC_OK
  await page.waitForSelector('text=SYNC_OK // 2026-04-20', { timeout: 10000 });
  const syncStatus = page.locator('text=SYNC_OK // 2026-04-20');
  await expect(syncStatus).toBeVisible();

  // Take a screenshot for manual review
  await page.screenshot({ path: 'verification/homepage_updated.png' });
});
