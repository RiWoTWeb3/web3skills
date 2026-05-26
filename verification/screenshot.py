from playwright.sync_api import sync_playwright, expect
import time

def run_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 1200})

        # Go to home page
        page.goto("http://localhost:3000")

        # Accept policy if modal appears
        try:
            accept_button = page.locator('button:has-text("I Understand and Accept")')
            if accept_button.is_visible(timeout=5000):
                accept_button.click()
        except:
            pass

        time.sleep(2)
        page.screenshot(path="verification/screenshots/homepage.png")

        # Go to Admin Panel
        page.goto("http://localhost:3000/#/notadmin")
        time.sleep(5) # Wait for charts
        page.screenshot(path="verification/screenshots/admin_panel.png", full_page=True)

        # Go to Jobs
        page.goto("http://localhost:3000/#/jobs")
        time.sleep(2)
        page.screenshot(path="verification/screenshots/jobs.png")

        browser.close()

if __name__ == "__main__":
    run_screenshots()
