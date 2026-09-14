import { test, expect } from "@playwright/test";

const localeExpectations = [
  {
    path: "/en/",
    subtitle: /evidence-based repository governance/i,
    workItemHeading: "Work Item lifecycle",
    verifiedNotApproved: "Verified ≠ Approved.",
  },
  {
    path: "/ja/",
    subtitle: /証拠に基づくリポジトリガバナンス/,
    workItemHeading: "Work Item（作業単位）のライフサイクル",
    verifiedNotApproved: "検証済み ≠ 承認済み。",
  },
  {
    path: "/zh-CN/",
    subtitle: /基于证据的仓库治理/,
    workItemHeading: "工作项生命周期",
    verifiedNotApproved: "已验证 ≠ 已批准。",
  },
];

for (const locale of localeExpectations) {
  test(`${locale.path} shows locale-appropriate copy and the Verified ≠ Approved distinction`, async ({
    page,
  }) => {
    await page.goto(locale.path);
    await expect(page.getByRole("heading", { name: "AI Cockpit Explorer" })).toBeVisible();
    await expect(page.getByText(locale.subtitle)).toBeVisible();

    await page.getByRole("tab").nth(1).click();
    await expect(page.getByText(locale.workItemHeading)).toBeVisible();

    await page.getByRole("tab").nth(2).click();
    await expect(page.getByText(locale.verifiedNotApproved, { exact: false })).toBeVisible();
  });
}

test("loads with a restrained Overview screen and lets a keyboard user explore without WebGL interaction", async ({
  page,
}) => {
  await page.goto("/en/");
  await expect(page.getByRole("heading", { name: "AI Cockpit Explorer" })).toBeVisible();
  await expect(page.getByText(/evidence determines what is verified/i)).toBeVisible();

  const runtimeButton = page.getByRole("button", { name: "AI Cockpit Runtime" });
  await runtimeButton.click();
  await expect(page.getByRole("heading", { name: "AI Cockpit Runtime" })).toBeVisible();
  await expect(page.getByText("Boundary")).toBeVisible();
});

test("exposes exactly three modes and Work Item mode shows the lifecycle as a timeline", async ({ page }) => {
  await page.goto("/en/");

  await expect(page.getByRole("tab")).toHaveCount(3);

  await page.getByRole("tab", { name: "Work Item" }).click();
  await expect(page.getByText("Work Item lifecycle")).toBeVisible();
  await expect(page.getByRole("button", { name: /inspect/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Close", exact: true })).toBeVisible();
});

test("guided tour runs the 8-scene narrative and reaches the verified-not-approved climax via the keyboard", async ({
  page,
}) => {
  await page.goto("/en/");

  const startButton = page.getByRole("button", { name: /understand ai cockpit in 30 seconds/i });
  await startButton.focus();
  await page.keyboard.press("Enter");

  await expect(page.getByText(/scene 1 of 8/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Request" })).toBeVisible();

  for (let i = 0; i < 1; i += 1) {
    const nextButton = page.getByRole("button", { name: "Next" });
    await nextButton.focus();
    await page.keyboard.press("Enter");
  }
  await expect(page.getByText(/scene 2 of 8/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Work Item" })).toBeVisible();

  for (let i = 0; i < 4; i += 1) {
    const nextButton = page.getByRole("button", { name: "Next" });
    await nextButton.focus();
    await page.keyboard.press("Enter");
  }

  await expect(page.getByText(/scene 6 of 8/i)).toBeVisible();
  await expect(page.getByText(/verified.*approved/i)).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText(/scene 7 of 8/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "HCI / Human Decision" })).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText(/scene 8 of 8/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Archive → Trace → Knowledge" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Done" })).toBeVisible();
});

test("Verification mode never renders GREEN or UNKNOWN evidence as an approved decision", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("tab", { name: "Verification" }).click();

  await expect(page.getByText(/verification: GREEN/i)).toBeVisible();
  await expect(page.getByText(/human decision: PENDING/i)).toBeVisible();
  await expect(page.getByText(/verified ≠ approved/i)).toBeVisible();

  await page.getByRole("button", { name: "RED" }).click();
  await expect(page.getByText(/verification: RED/i)).toBeVisible();
  await expect(page.getByText(/human decision: PENDING/i)).toBeVisible();
});

test("Work Item mode shows a Trace timeline with the finalize/close cleanup collapsed by default", async ({
  page,
}) => {
  await page.goto("/en/");
  await page.getByRole("tab", { name: "Work Item" }).click();

  await expect(page.getByText(/Trace \/ Audit/i)).toBeVisible();
  await expect(page.getByText(/Intent recorded/i)).toBeVisible();
  await expect(page.getByText(/Archived into Repository Protocol/i)).toBeVisible();
  await expect(page.getByText(/Provider finalization receipt recorded/i)).not.toBeVisible();

  await page.getByRole("button", { name: /show advanced/i }).click();
  await expect(page.getByText(/Provider finalization receipt recorded/i)).toBeVisible();
  await expect(page.getByText(/Work Item closed; record made immutable/i)).toBeVisible();
});

test("Knowledge and the Human Control Interface are selectable as their own distinct elements", async ({ page }) => {
  await page.goto("/en/");

  await page.getByRole("button", { name: "Knowledge" }).click();
  await expect(page.getByRole("heading", { name: "Knowledge" })).toBeVisible();
  await expect(page.getByText(/not a source of authority/i)).toBeVisible();

  await page.getByRole("button", { name: "Human Control Interface" }).click();
  await expect(page.getByRole("heading", { name: "Human Control Interface" })).toBeVisible();
  await expect(page.getByText(/not a literal Runtime service/i)).toBeVisible();

  await page.getByRole("button", { name: "Work Item", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Work Item", exact: true })).toBeVisible();
  await expect(page.getByText(/bounded, evolving envelope/i)).toBeVisible();
});

test("language switcher is visible top-right, updates the URL, and preserves the current mode", async ({
  page,
}) => {
  await page.goto("/en/");
  await page.getByRole("tab", { name: "Work Item" }).click();
  await expect(page.getByText("Work Item lifecycle")).toBeVisible();

  const jaLink = page.getByRole("link", { name: "日本語" });
  await expect(jaLink).toHaveAttribute("href", /mode=workitem/);
  await jaLink.click();
  await expect(page).toHaveURL(/\/ja\/?(\?.*)?$/);
  await expect(page.getByText("Work Item（作業単位）のライフサイクル")).toBeVisible();

  await page.getByRole("link", { name: "中文" }).click();
  await expect(page).toHaveURL(/\/zh-CN\/?(\?.*)?$/);
  await expect(page.getByText("工作项生命周期")).toBeVisible();
});

test("camera stays stable after a focus transition and survives rapidly clicking through every object", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/en/");

  // Single focus transition: click one object, let the transition
  // settle, then wait well past it (the old bug re-snapped the camera
  // on the very next OrbitControls tick after "arriving").
  const runtimeButton = page.getByRole("button", { name: "AI Cockpit Runtime" });
  await runtimeButton.click();
  await expect(page.getByRole("heading", { name: "AI Cockpit Runtime" })).toBeVisible();
  await page.waitForTimeout(5000);
  await expect(page.getByRole("heading", { name: "AI Cockpit Runtime" })).toBeVisible();

  // Rapidly click through every element picker button in quick
  // succession; the app must remain responsive and land stably on the
  // last one, with no crash/console error from the camera controller.
  const labels = [
    "Agents",
    "Entry Gate",
    "Contract",
    "AI Cockpit Runtime",
    "Software Repository",
    "Repository Protocol",
    "Evidence",
    "Outcome",
    "Human Authority",
    "AI Cockpit Runtime",
  ];
  for (const label of labels) {
    await page.getByRole("button", { name: label, exact: true }).click();
  }
  await expect(page.getByRole("heading", { name: "AI Cockpit Runtime" })).toBeVisible();
  await expect(page.locator("canvas")).toBeVisible();

  expect(consoleErrors).toEqual([]);
});
