import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 1200 });
  await page.goto('http://localhost:3000');

  // Accept policy
  await page.click('button:has-text("I Understand and Accept")');
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'verification/homepage.png', fullPage: true });

  await page.goto('http://localhost:3000/#/news');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verification/newsview.png', fullPage: true });

  await page.goto('http://localhost:3000/#/notadmin');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'verification/adminpanel.png', fullPage: true });

  await browser.close();
})();
