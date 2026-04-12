/**
 * @file src\pages\__tests__\Contact.test.jsx
 * @description src\pages\__tests__\Contact.test module.
 * @module src\pages\__tests__\Contact.test
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Contact from "../Contact/index.jsx";
import contactForm from "assets/data/content/contactForm.js";
import renderWithProviders from "tests/renderWithProviders";

const toLabelMatcher = (label, fallback) =>
  new RegExp(String(label || fallback).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
const fieldSelector = "input,textarea";

/**
 * @fileoverview
 * Tests for the Contact page, focusing on form submission behavior and error handling.
 *
 * Testing strategy:
 * - Mocks the global fetch function to simulate API responses for contact form submissions.
 * - Tests successful form submission by verifying that the correct API endpoint is called with the expected payload.
 * - Tests error handling by simulating a failed API response and verifying that the appropriate error message is displayed, as well as allowing for a retry of the submission.
 *
 * Design intent:
 * The Contact page is designed to allow users to send messages through a contact form. The tests ensure that the form submission process works correctly, including handling both successful and failed submissions. By mocking the fetch function, we can isolate the component's behavior and verify that it interacts with the API as expected without relying on actual network requests.
 *
 * @module tests/pages/Contact
 * @author Kyle Foster
 * @see Contact.jsx for the component implementation
 */

describe("Contact page", () => {
  const schemaFields = Array.isArray(contactForm?.fields) ? contactForm.fields : [];
  const nameLabel = schemaFields.find((field) => ["name", "fullName"].includes(field?.name))?.label;
  const emailLabel = schemaFields.find((field) => field?.name === "email")?.label;
  const messageLabel = schemaFields.find((field) => field?.name === "message")?.label;
  const submitLabel = contactForm?.submitLabel || "Send Message";

  // Store the original fetch function to restore it after tests, ensuring that other tests are not affected by our mock.
  const originalFetch = global.fetch;

  // Clear mocks before each test to ensure a clean slate and prevent interference between tests. This is important because we are mocking the global fetch function, and we want to ensure that each test starts with a fresh mock state.
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  // Verifies that the contact form sends a POST request to the correct API endpoint with the expected payload when the form is submitted. This test simulates user input by typing into the form fields and clicking the submit button, then waits for the fetch function to be called and checks that it was called with the correct URL and options, including the method and body containing the form data.
  afterEach(() => {
    global.fetch = originalFetch;
  });

  // Verifies that the contact form allows for a retry after a failed submission by simulating a failed API response and then a successful response on the second attempt. This test simulates user input and submission, checks for the presence of an error message after the first failed submission, and then simulates another submission to verify that the fetch function is called again, allowing for a retry of the contact form submission process.
  it("sends a contact request when the form is submitted", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Message sent successfully." }),
    });

    renderWithProviders(<Contact />, {
      initialEntries: ["/contact"],
    });

    // Simulate user input for the contact form fields and submit the form. This involves typing a name, email, and message into the respective form fields and then clicking the submit button. After the submission, we wait for the fetch function to be called and verify that it was called with the correct URL and options, confirming that the form submission process is working as expected.
    await user.type(
      await screen.findByLabelText(toLabelMatcher(nameLabel, "name"), { selector: fieldSelector }),
      "Kyle Foster"
    );
    await user.type(
      screen.getByLabelText(toLabelMatcher(emailLabel, "email"), { selector: fieldSelector }),
      "kyle@example.com"
    );
    await user.type(
      screen.getByLabelText(toLabelMatcher(messageLabel, "message"), { selector: fieldSelector }),
      "Testing contact form"
    );
    await user.click(
      screen.getByRole("button", { name: toLabelMatcher(submitLabel, "send message") })
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const [url, options] = global.fetch.mock.calls[0];

    // Verify that the fetch function was called with the correct URL and options, including the method and body containing the form data. This confirms that the contact form is sending the correct request to the API endpoint when submitted.
    expect(url).toBe("https://email-microservice-grem.onrender.com/api/contact");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({
      name: "Kyle Foster",
      email: "kyle@example.com",
      message: "Testing contact form",
    });
  });

  // Verifies that the contact form allows for a retry after a failed submission by simulating a failed API response and then a successful response on the second attempt. This test simulates user input and submission, checks for the presence of an error message after the first failed submission, and then simulates another submission to verify that the fetch function is called again, allowing for a retry of the contact form submission process. This ensures that users have the opportunity to correct any issues and resubmit the form if their initial attempt fails, improving the user experience and robustness of the contact form.
  it("allows a retry after a failed request", async () => {
    const user = userEvent.setup();

    global.fetch
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Failed to send message." }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Message sent successfully." }),
      });

    renderWithProviders(<Contact />, {
      initialEntries: ["/contact"],
    });

    // Simulate user input for the contact form fields and submit the form. This involves typing a name, email, and message into the respective form fields and then clicking the submit button. After the first submission, we wait for an error message to be displayed, simulating a failed submission. Then we simulate another submission to verify that the fetch function is called again, allowing for a retry of the contact form submission process. This ensures that users have the opportunity to correct any issues and resubmit the form if their initial attempt fails, improving the user experience and robustness of the contact form.
    await user.type(
      await screen.findByLabelText(toLabelMatcher(nameLabel, "name"), { selector: fieldSelector }),
      "Kyle Foster"
    );
    await user.type(
      screen.getByLabelText(toLabelMatcher(emailLabel, "email"), { selector: fieldSelector }),
      "kyle@example.com"
    );
    await user.type(
      screen.getByLabelText(toLabelMatcher(messageLabel, "message"), { selector: fieldSelector }),
      "Retry test"
    );

    await user.click(
      screen.getByRole("button", { name: toLabelMatcher(submitLabel, "send message") })
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/failed to send message/i);
    });

    await user.click(
      screen.getByRole("button", { name: toLabelMatcher(submitLabel, "send message") })
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
