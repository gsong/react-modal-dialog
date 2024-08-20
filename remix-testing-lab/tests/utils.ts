import type { Page } from "@playwright/test";

import { expect } from "@playwright/test";

export const openModal = async (page: Page) => {
  await page.getByRole("button", { name: "Open Modal" }).click();
  await expectOpenedModal(page);
};

export const expectOpenedModal = async (page: Page) => {
  await expect(page.getByRole("dialog")).toBeInViewport();
};

export const expectClosedModal = async (page: Page) => {
  await expect(page.getByTestId("modal")).not.toBeInViewport();
};

export const scrollBody = async (page: Page, pixels: number) => {
  await page.evaluate(() => {
    document.body.style.height = "200vh";
  });

  await page.mouse.wheel(0, pixels);
};
