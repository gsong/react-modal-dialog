import { expect, test } from "@playwright/test";

import {
  expectClosedModal,
  expectOpenedModal,
  openModal,
  scrollBody,
} from "./utils";

test.describe("Default Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/default");
    await openModal(page);
  });

  test("doesn't close when clicking outside the modal", async ({ page }) => {
    await page.click("body", { position: { x: 0, y: 0 } });
    await expectOpenedModal(page);
  });

  test("closes when pressing ESC key", async ({ page }) => {
    await page.keyboard.press("Escape");
    await expectClosedModal(page);
  });

  test("closes when clicking the Close Modal button", async ({ page }) => {
    await page.getByRole("button", { name: "Close Modal" }).click();
    await expectClosedModal(page);
  });

  test("doesn't allow body to scroll when modal is open", async ({ page }) => {
    await scrollBody(page, 100);
    await page.waitForTimeout(500);

    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBe(0);
  });
});
