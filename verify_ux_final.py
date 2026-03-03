import asyncio
from playwright.async_api import async_playwright
import os

async def verify_ux():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Go to the local dev server
        try:
            await page.goto('http://localhost:3000', timeout=10000)
        except Exception:
            print("Server not running at localhost:3000. Start it first.")
            await browser.close()
            return

        # Handle policy modal
        if await page.is_visible('text=I Understand and Accept'):
            await page.click('text=I Understand and Accept')
            await page.wait_for_timeout(500)

        # We start in Dark Mode (default)
        themes = ['dark', 'light', 'recommended']

        for theme in themes:
            print(f"Verifying {theme} mode...")

            # Switch theme if not already in it
            current_theme_class = await page.evaluate("document.documentElement.className")
            if f"theme-{theme}" not in current_theme_class:
                print(f"Switching to {theme}...")
                if theme == 'light':
                    await page.click('button[aria-label="Switch to light mode"]')
                elif theme == 'dark':
                    await page.click('button[aria-label="Switch to dark mode"]')
                elif theme == 'recommended':
                    await page.click('button[aria-label="Switch to recommended mode"]')
                await page.wait_for_timeout(1000)

            # Screenshot Home
            await page.click('a:has-text("Home")')
            await page.wait_for_timeout(500)
            await page.screenshot(path=f'verification/home_{theme}.png', full_page=True)

            # Screenshot Jobs
            await page.click('a[href="#/jobs"]')
            await page.wait_for_timeout(1000)
            await page.screenshot(path=f'verification/jobs_{theme}.png', full_page=True)

            # Screenshot Careers
            await page.click('a[href="#/careers"]')
            await page.wait_for_timeout(1000)
            await page.screenshot(path=f'verification/careers_{theme}.png', full_page=True)

            # Screenshot Intel
            await page.click('a[href="#/news"]')
            await page.wait_for_timeout(1000)
            await page.screenshot(path=f'verification/news_{theme}.png', full_page=True)

        await browser.close()
        print("Verification screenshots generated in verification/ folder.")

if __name__ == '__main__':
    if not os.path.exists('verification'):
        os.makedirs('verification')
    asyncio.run(verify_ux())
