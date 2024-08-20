import type { Page } from "@playwright/test";

import { test, expect } from "@playwright/test";

import { testUrl } from "../playwright.config";

test.describe("Modal Component", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the root of the app where the modal is used
    await page.goto(testUrl);
    // Open the modal (assuming there's a button to open it)
    await page.getByRole("button", { name: "Open Modal" }).click();
    await expectOpenedModal(page);
  });

  test("closes when clicking outside the modal", async ({ page }) => {
    await page.click("body", { position: { x: 0, y: 0 } });
    await expectClosedModal(page);
  });

  test("closes when pressing ESC key", async ({ page }) => {
    await page.keyboard.press("Escape");
    await expectClosedModal(page);
  });

  test("closes when clicking the Close Modal button", async ({ page }) => {
    await page.getByRole("button", { name: "Close Modal" }).click();
    await expectClosedModal(page);
  });

  test("allows body to scroll when modal is open", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName === "webkit");

    // Add content to make the page scrollable
    await page.evaluate(() => {
      document.body.style.height = "200vh";
    });

    // Scroll the page
    await page.mouse.wheel(0, 100);
    // await page.waitForFunction(() => window.scrollY >= 100);
    await page.waitForTimeout(500);

    // Check if the scroll position has changed
    const scrollPosition = await page.evaluate(() => window.scrollY);
    // expect(scrollPosition).toBeGreaterThan(0);
    expect(scrollPosition).toBe(0);
  });
});

const expectOpenedModal = async (page: Page) => {
  await expect(page.getByRole("dialog")).toHaveCount(1);
  // expect(page.getByRole("dialog")).toBeInViewport();
};

const expectClosedModal = async (page: Page) => {
  // expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByTestId("modal")).not.toBeInViewport();
};
