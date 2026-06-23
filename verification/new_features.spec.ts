import { test, expect } from '@playwright/test';

test.use({
  launchOptions: {
    executablePath: '/usr/bin/google-chrome',
  },
});

test('Verify new UI components on homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Handle Policy Modal
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Daily Learning Streak
  await expect(page.locator('h3').filter({ hasText: "Learning Streak" })).toBeVisible();

  // Verify Security Pulse
  await expect(page.locator('h3').filter({ hasText: "Security Pulse" })).toBeVisible();

  // Verify Project Ideas
  await expect(page.locator('h3').filter({ hasText: /^Project Idea$/ })).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/homepage_new_features.png', fullPage: true });
});

test('Verify Interview Prep page', async ({ page }) => {
  await page.goto('http://localhost:3000/#/interview-prep');

  // Handle Policy Modal
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Heading
  await expect(page.locator('h1').filter({ hasText: /Interview Preparation|INTERVIEW_PREP.CORE/ })).toBeVisible();

  // Verify Q&A content
  await expect(page.locator('text=Ethereum account model')).toBeVisible();
  await expect(page.locator('text=PDA in Solana')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/interview_prep.png', fullPage: true });
});
