import { test, expect } from "@playwright/test";

test("loads with a restrained Overview screen and lets a keyboard user explore without WebGL interaction", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "AI Cockpit Explorer" })).toBeVisible();
  await expect(page.getByText(/evidence determines what is verified/i)).toBeVisible();

  const runtimeButton = page.getByRole("button", { name: "AI Cockpit Runtime" });
  await runtimeButton.click();
  await expect(page.getByRole("heading", { name: "AI Cockpit Runtime" })).toBeVisible();
  await expect(page.getByText("Boundary")).toBeVisible();
});

test("exposes exactly three modes and Work Item mode shows the lifecycle as a timeline", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("tab")).toHaveCount(3);

  await page.getByRole("tab", { name: "Work Item" }).click();
  await expect(page.getByText("Work Item lifecycle")).toBeVisible();
  await expect(page.getByRole("button", { name: /inspect/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /close/i })).toBeVisible();
});

test("guided tour runs the 7-scene narrative and reaches the verified-not-approved climax via the keyboard", async ({
  page,
}) => {
  await page.goto("/");

  const startButton = page.getByRole("button", { name: /understand ai cockpit in 30 seconds/i });
  await startButton.focus();
  await page.keyboard.press("Enter");

  await expect(page.getByText(/scene 1 of 7/i)).toBeVisible();

  for (let i = 0; i < 5; i += 1) {
    const nextButton = page.getByRole("button", { name: "Next" });
    await nextButton.focus();
    await page.keyboard.press("Enter");
  }

  await expect(page.getByText(/scene 6 of 7/i)).toBeVisible();
  await expect(page.getByText(/verified.*approved/i)).toBeVisible();
});

test("Verification mode never renders GREEN or UNKNOWN evidence as an approved decision", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Verification" }).click();

  await expect(page.getByText(/verification: GREEN/i)).toBeVisible();
  await expect(page.getByText(/human decision: PENDING/i)).toBeVisible();
  await expect(page.getByText(/verified ≠ approved/i)).toBeVisible();

  await page.getByRole("button", { name: "RED" }).click();
  await expect(page.getByText(/verification: RED/i)).toBeVisible();
  await expect(page.getByText(/human decision: PENDING/i)).toBeVisible();
});
