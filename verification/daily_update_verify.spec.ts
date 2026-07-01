import { test, expect } from '@playwright/test';

test.use({ launchOptions: { executablePath: '/usr/bin/google-chrome' } });

test('Verify Project Ideas and Interview Prep', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Handle Policy Modal
  const acceptButton = page.locator('button:has-text("I Understand and Accept")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Project Ideas component on dashboard
  await expect(page.locator('h3:has-text("Project Ideas")')).toBeVisible();
  await expect(page.locator('text=Solidity: Multi-Sig Wallet')).toBeVisible();
  await expect(page.locator('text=Rust: Solana Token Vesting')).toBeVisible();

  // Navigate to Interview Prep
  await page.click('nav a:has-text("Interview")');
  await expect(page).toHaveURL(/interview-prep/);

  // Verify Interview Prep content (use getByRole to avoid ambiguity)
  await expect(page.getByRole('heading', { name: /Interview Preparation|INTERVIEW_PREP.CORE/i })).toBeVisible();
  await expect(page.locator('h3:has-text("CORE")')).toBeVisible();
  await expect(page.locator('text=How does the EVM handle state changes?')).toBeVisible();

  await page.screenshot({ path: 'verification_screenshots/new_features_verification.png', fullPage: true });
});
