import { test, expect } from "@playwright/test";

/**
 * Contact flow E2E test.
 *
 * Validates:
 * - user can complete the form
 * - frontend sends the correct request payload
 * - success feedback becomes visible
 *
 * The API is mocked so the test is deterministic and does not depend
 * on the live Render mail microservice.
 */
test("contact form sends correct payload and shows success state", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    const payload = route.request().postDataJSON();

    // Verify the outbound request contract
    expect(payload).toEqual({
      name: "Kyle Foster",
      email: "kyle@example.com",
      message: "Playwright contact test",
    });

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Message sent successfully." }),
    });
  });

  await page.goto("/contact");

  await page.getByLabel(/name/i).fill("Kyle Foster");
  await page.getByRole("textbox", { name: /email/i }).fill("kyle@example.com");
  await page
    .getByRole("textbox", { name: /message|project details/i })
    .fill("Playwright contact test");

  await page.getByRole("button", { name: /send message/i }).click();

  await expect(page.getByText(/message sent/i)).toBeVisible();
});
