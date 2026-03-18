import asyncio
from playwright.async_api import async_playwright
import os

async def final_screenshot():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        await page.goto("http://localhost:3000/#/jobs")
        try:
            await page.click("button:has-text('I Understand and Accept')", timeout=2000)
        except: pass
        await page.screenshot(path="final_verification.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(final_screenshot())
