import { test, expect } from '@playwright/test';

test.use({ launchOptions: { executablePath: '/usr/bin/google-chrome' } });

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }
});

test('Verify new UI components on homepage', async ({ page }) => {
  // Verify Daily Learning Streak
  await expect(page.locator('h3:has-text("Learning Streak")')).toBeVisible();

  // Verify Project Idea
  await expect(page.locator('h3:has-text("Project Idea")')).toBeVisible();

  // Verify Security Pulse
  await expect(page.locator('h3:has-text("Security Pulse")')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/homepage_new_features.png', fullPage: true });
});

test('Verify Interview Prep view', async ({ page }) => {
  // Click Interview link in nav
  await page.click('nav a:has-text("Interview")');

  // Verify technical Q&A
  await expect(page.locator('text=Blockchain Trilemma')).toBeVisible();

  // Check for either possible title text
  const title = page.locator('h1').filter({ hasText: /Interview Preparation|INTERVIEW_PREP.CORE/i });
  await expect(title).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/interview_prep.png', fullPage: true });
});

test('Verify updated data feed', async ({ page }) => {
  await page.goto('http://localhost:3000/#/news');

  // Verify one of the new news items
  await expect(page.locator('text=Force Bridge Announces Sunset')).toBeVisible();
  await expect(page.locator('text=ALEX Protocol Exploited')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/news_feed_updated.png', fullPage: true });
});
