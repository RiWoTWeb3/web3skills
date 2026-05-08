import { test, expect } from '@playwright/test';

test('Verify new UI features', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Handle Policy Modal
  const acceptButton = page.getByRole('button', { name: 'I Understand and Accept' });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Daily Streak on HomePage
  await expect(page.getByText('LEARNING_STREAK')).toBeVisible();
  await expect(page.getByText(/DAYS/)).toBeVisible();

  // Verify Intelligence Summary on NewsView
  await page.goto('http://localhost:3000/#/news');
  await expect(page.getByText('System Intelligence Summary')).toBeVisible();
  await expect(page.getByText('Primary Focus', { exact: true })).toBeVisible();

  // Verify Skill Market Value on AdminPanelView
  await page.goto('http://localhost:3000/#/notadmin');
  await page.waitForTimeout(5000); // Wait for charts to load
  await expect(page.getByText('Skill Market Value (Avg USD)')).toBeVisible();

  // Take screenshots
  await page.goto('http://localhost:3000/');
  await page.screenshot({ path: 'homepage_streak.png' });
  await page.goto('http://localhost:3000/#/news');
  await page.screenshot({ path: 'news_summary.png' });
  await page.goto('http://localhost:3000/#/notadmin');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'admin_skill_value.png' });
});
