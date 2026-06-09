import { test, expect } from '@playwright/test';

test.describe('RiWoT New Features Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Accept policy if visible
    const acceptButton = page.locator('button:has-text("I Understand and Accept")');
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  });

  test('Project Ideas component is visible on Homepage', async ({ page }) => {
    const projectIdeas = page.locator('h3:has-text("Project Ideas")');
    await expect(projectIdeas).toBeVisible();

    const evmProject = page.locator('text=EVM Multi-sig Wallet');
    await expect(evmProject).toBeVisible();
  });

  test('Interview Prep view is accessible and functional', async ({ page }) => {
    await page.goto('http://localhost:3000/#/interview-prep');

    // Using regex to match either dark or light mode title
    const title = page.locator('h1').filter({ hasText: /INTERVIEW_PREP.CORE|Technical Interview Prep/ });
    await expect(title).toBeVisible();

    const question = page.locator('text=What is a reentrancy attack').first();
    await expect(question).toBeVisible();

    // Click to expand
    await question.click();
    const answer = page.locator('text=ANALYSIS:').first();
    await expect(answer).toBeVisible();
  });

  test('Professional Readiness Matrix is visible on Careers page', async ({ page }) => {
    await page.goto('http://localhost:3000/#/careers');

    const chartTitle = page.locator('h3:has-text("Professional Readiness Matrix")');
    await expect(chartTitle).toBeVisible();

    // Verify some career labels in the chart area
    const label = page.locator('text=EVM Smart Contract Developer').first();
    await expect(label).toBeVisible();
  });
});
