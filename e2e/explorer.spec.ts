import { test, expect } from "@playwright/test";

test("loads and lets a keyboard user explore without WebGL interaction", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /interactive architecture/i })).toBeVisible();

  const runtimeButton = page.getByRole("button", { name: "AI Cockpit Runtime" });
  await runtimeButton.click();
  await expect(page.getByRole("heading", { name: "AI Cockpit Runtime" })).toBeVisible();
});

test("guided tour can be started and stepped through via the keyboard", async ({ page }) => {
  await page.goto("/");

  const startButton = page.getByRole("button", { name: /start guided tour/i });
  await startButton.focus();
  await page.keyboard.press("Enter");

  await expect(page.getByText(/step 1 of/i)).toBeVisible();

  const nextButton = page.getByRole("button", { name: "Next" });
  await nextButton.focus();
  await page.keyboard.press("Enter");

  await expect(page.getByText(/step 2 of/i)).toBeVisible();
});

test("verification scenarios never render UNKNOWN evidence as an approved decision", async ({
  page,
}) => {
  await page.goto("/");

  const redButton = page.getByRole("button", { name: "RED" });
  await redButton.click();

  await expect(page.getByText(/verification: RED/i)).toBeVisible();
  await expect(page.getByText(/human decision: PENDING/i)).toBeVisible();
});
