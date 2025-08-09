from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This function verifies that the homepage renders correctly.
    """
    # 1. Arrange: Go to the homepage.
    page.goto("http://localhost:3000")

    # 2. Assert: Check that the main heading is visible.
    # This confirms the page has loaded before we take the screenshot.
    about_me_heading = page.get_by_role("heading", name="About Me")
    expect(about_me_heading).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/homepage.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()
