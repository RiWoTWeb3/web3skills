import { test, expect } from '@playwright/test';

test('Verify new UI components on homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Handle Policy Modal
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Daily Learning Streak
  await expect(page.locator('h3:has-text("Learning Streak")')).toBeVisible();
  await expect(page.locator('text=/Days/')).toBeVisible();

  // Verify Security Pulse
  await expect(page.locator('h3:has-text("Security Pulse")')).toBeVisible();
  await expect(page.locator('text=/Safety Index/')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/homepage_new_features.png', fullPage: true });
});

test('Verify new Admin charts', async ({ page }) => {
  await page.goto('http://localhost:3000/#/notadmin');

  // Handle Policy Modal if it appears
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Wait for charts to load
  await page.waitForTimeout(5000);

  // Verify Market Opportunity Distribution
  await expect(page.locator('h3:has-text("Market Opportunity Distribution")')).toBeVisible();

  // Verify Skill Market Value
  await expect(page.locator('h3:has-text("Skill Market Value (Avg USD)")')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/admin_new_charts.png', fullPage: true });
});

test('Verify Project Ideas on homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Handle Policy Modal
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Project Ideas
  await expect(page.locator('h3:has-text("Project Idea")')).toBeVisible();
  await expect(page.locator('text=DeFi Yield Aggregator')).toBeVisible();
  await expect(page.locator('text=Solana NFT Marketplace')).toBeVisible();
  await expect(page.locator('text=ZK Identity Verifier')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/homepage_project_ideas.png', fullPage: true });
});

test('Verify Interview Prep view', async ({ page }) => {
  await page.goto('http://localhost:3000/#/interview-prep');

  // Handle Policy Modal
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Interview Prep Title
  await expect(page.locator('h1').filter({ hasText: /Interview Preparation|INTERVIEW_PREP.CORE/ })).toBeVisible();

  // Verify Tabs
  await expect(page.locator('button:has-text("EVM")')).toBeVisible();
  await expect(page.locator('button:has-text("Security")')).toBeVisible();
  await expect(page.locator('button:has-text("Solana")')).toBeVisible();

  // Verify EVM question (default active)
  await expect(page.locator('text=What is the difference between transfer, send, and call in Solidity?')).toBeVisible();

  // Switch to Security
  await page.click('button:has-text("Security")');
  await expect(page.locator('text=What is a Reentrancy attack and how do you prevent it?')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/interview_prep_view.png', fullPage: true });
});
