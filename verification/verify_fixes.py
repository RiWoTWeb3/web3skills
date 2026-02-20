from playwright.sync_api import Page, expect, sync_playwright
import time

def test_fixes(page: Page):
    page.goto("http://localhost:3000/#/")
    try:
        btn = page.get_by_role("button", name="I Understand and Accept")
        btn.wait_for(state="visible", timeout=5000)
        btn.click()
    except:
        pass
    time.sleep(1)
    page.screenshot(path="verification/home_dark_final.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_fixes(page)
        finally:
            browser.close()
