import { test, expect } from "@playwright/test";

/**
 * @file contact.spec.ts
 * @description E2E tests for the contact page, validating form submission, request payload, and success feedback. The API is mocked for deterministic testing without relying on the live Render mail microservice.
 * @tests
 * - Validates that the contact form sends the correct payload to the API when submitted.
 * - Verifies that a success message is displayed upon successful form submission.
 * - Ensures that the test is deterministic by mocking the API response, allowing for consistent results regardless of external factors.
 * @note This test suite focuses on the contact form's functionality and user experience, ensuring that users can successfully submit their messages and receive appropriate feedback without relying on the actual backend service during testing.
 */

// The test suite is organized under a describe block for the Contact page, grouping related tests together for better organization and readability. Each test case focuses on a specific aspect of the contact form's functionality, ensuring that the form behaves as expected under various conditions.
test.describe("Contact page", () => {
  // Verifies that the contact form sends a POST request to the correct API endpoint with the expected payload when the form is submitted. This test simulates user input by filling in the form fields and clicking the submit button, then waits for the API request to be made and checks that it contains the correct data, ensuring that the form submission process is working as intended.
  test("submits successfully when the API returns success", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      const payload = route.request().postDataJSON();

      // Verify the outbound request contract by checking that the payload sent to the API matches the expected structure and values based on the user input. This ensures that the frontend is correctly formatting the data before sending it to the backend, which is crucial for successful communication between the two layers of the application.
      expect(payload).toEqual({
        name: "Kyle Foster",
        email: "kyle@example.com",
        message: "Playwright contact test",
      });

      // Mock the API response to simulate a successful submission, allowing the test to be deterministic and not rely on the actual backend service. This ensures that the test can consistently verify the frontend behavior without being affected by external factors such as network issues or backend downtime.
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Message sent successfully." }),
      });
    });

    await page.goto("/contact");

    // Simulate user input for the contact form fields and submit the form. This involves filling in the name, email, and message fields with test data and then clicking the submit button. After submission, we check for the presence of a success message to confirm that the form submission process is working correctly and providing appropriate feedback to the user.
    await page.getByLabel(/name/i).fill("Kyle Foster");
    await page.getByRole("textbox", { name: /email/i }).fill("kyle@example.com");
    await page
      .getByRole("textbox", { name: /message|project details/i })
      .fill("Playwright contact test");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/message sent successfully/i)).toBeVisible();
  });
});
