from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 1200})
        page = context.new_page()

        # Navigate to Homepage
        page.goto("http://localhost:3000")

        # Accept policy if visible
        try:
            accept_button = page.locator('button:has-text("I Understand and Accept")')
            if accept_button.is_visible(timeout=5000):
                accept_button.click()
        except:
            pass

        # Capture Homepage
        page.screenshot(path="verification_screenshots/homepage.png", full_page=True)
        print("Captured homepage.png")

        # Navigate to Admin Panel
        page.goto("http://localhost:3000/#/notadmin")
        page.wait_for_timeout(5000) # Wait for charts to render
        page.screenshot(path="verification_screenshots/admin_panel.png", full_page=True)
        print("Captured admin_panel.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
