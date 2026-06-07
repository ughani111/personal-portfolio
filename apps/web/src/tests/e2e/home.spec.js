import { expect, test } from "@playwright/test";

test("homepage loads and main navigation anchors exist", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: /usman ghani/i })
  ).toBeVisible();
  await expect(page.locator('a[href="/#about"]').first()).toBeVisible();
  await expect(page.locator('a[href="/#experience"]').first()).toBeVisible();
  await expect(page.locator('a[href="/#work"]').first()).toBeVisible();
  await expect(page.locator('a[href="/#contact"]').first()).toBeVisible();
});

test("mobile navigation opens and closes", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/");

  await page.getByRole("button", { name: /open navigation menu/i }).click();
  await expect(page.getByRole("dialog", { name: /mobile navigation/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /mobile navigation/i })).toHaveCount(0);
});

test("contact form validation appears", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /send message/i }).click();

  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(
    page.getByText("Share a little more context so I can respond helpfully.")
  ).toBeVisible();
});

test("keyboard navigation reaches the primary CTA", async ({ page }) => {
  await page.goto("/");

  const exploreWork = page.getByRole("link", { name: /explore my work/i });

  for (let index = 0; index < 16; index += 1) {
    await page.keyboard.press("Tab");

    if (await exploreWork.evaluate((element) => element === document.activeElement)) {
      break;
    }
  }

  await expect(exploreWork).toBeFocused();
});

test("no obvious horizontal overflow at mobile width", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 360 });
  await page.goto("/");

  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 1;
  });

  expect(hasOverflow).toBe(false);
});

test("reduced-motion mode keeps content accessible", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();

  await page.goto("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1, name: /usman ghani/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /case studies/i })).toBeVisible();

  await context.close();
});

test("resume download behaves safely when the file is missing", async ({ page }) => {
  await page.goto("/");

  const downloadLink = page.getByRole("link", { name: /download resume/i });
  const fallbackButton = page.getByRole("button", { name: /resume coming soon/i });

  const linkCount = await downloadLink.count();
  const buttonCount = await fallbackButton.count();

  expect(linkCount + buttonCount).toBeGreaterThan(0);
});
