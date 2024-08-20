import { expect, test } from "@playwright/test";

import { openModal, scrollBody } from "./utils";

test.describe("Modal Allowing Body Scroll", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/allow-body-scroll");
    await openModal(page);
  });

  test("allows body to scroll when modal is open", async ({ page }) => {
    await scrollBody(page, 100);
    await page.waitForFunction(() => window.scrollY >= 100);

    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeGreaterThan(0);
  });
});
