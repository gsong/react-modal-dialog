import { expect, test } from "@playwright/test";

import { expectClosedModal, openModal } from "./utils";

test.describe("Modal Allowing Dismiss", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/allow-dismiss");
    await openModal(page);
  });

  test("closes when clicking outside the modal", async ({ page }) => {
    await page.click("body", { position: { x: 0, y: 0 } });
    await expectClosedModal(page);
    await expect(page.getByText("Dismissed")).toBeVisible();
  });
});
