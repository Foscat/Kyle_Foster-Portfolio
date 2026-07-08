/**
 * @file src\pages\__tests__\Contact.test.jsx
 * @description Regression tests for the current content-driven Contact page.
 * @module src\pages\__tests__\Contact.test
 */

import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Contact, { buildContactRequestPayload, resolveContactApiUrl } from "../Contact/index.jsx";
import renderWithProviders from "tests/renderWithProviders";
import { PageRoute } from "types/navigation.types";

vi.mock("components/navigation", () => ({
  StickyNav: ({ activePage }) => (
    <nav aria-label="Contact navigation" data-testid="contact-nav" data-active-page={activePage} />
  ),
  Footer: () => <footer data-testid="contact-footer">Footer Mock</footer>,
}));

vi.mock("components/renderers", () => ({
  SectionRenderer: ({ section }) => (
    <section
      aria-label={section?.title || "Contact section"}
      data-testid="contact-section"
      data-section-id={section?.id || ""}
    >
      <h2>{section?.title || "Contact section"}</h2>
      {section?.blocks?.map((block) =>
        typeof block.onSubmit === "function" ? (
          <button
            key={block.id}
            type="button"
            onClick={() =>
              block.onSubmit({
                fullName: "Kyle Foster",
                email: "kyle@example.com",
                message: "Testing the contact form",
              })
            }
          >
            Submit mocked contact form
          </button>
        ) : null
      )}
    </section>
  ),
}));

/**
 * The Contact page delegates content blocks to the section renderer, so this
 * suite verifies page composition and route wiring rather than field internals.
 *
 * @suite Contact page composition
 */
describe("Contact page", () => {
  it("normalizes configured contact API endpoints", () => {
    expect(resolveContactApiUrl()).toBe("/api/contact");
    expect(resolveContactApiUrl("https://email-microservice-grem.onrender.com")).toBe(
      "https://email-microservice-grem.onrender.com/api/contact"
    );
    expect(resolveContactApiUrl("https://email-microservice-grem.onrender.com/")).toBe(
      "https://email-microservice-grem.onrender.com/api/contact"
    );
    expect(resolveContactApiUrl("https://email-microservice-grem.onrender.com/api/contact")).toBe(
      "https://email-microservice-grem.onrender.com/api/contact"
    );
  });

  it("builds the Render email service payload from form values", () => {
    const payload = buildContactRequestPayload({
      fullName: "Kyle Foster",
      email: "kyle@example.com",
      contactMethods: ["email", "text"],
      message: "Testing the contact form",
    });

    expect(payload).toMatchObject({
      name: "Kyle Foster",
      email: "kyle@example.com",
    });
    expect(payload.message).toContain("Portfolio Contact Submission");
    expect(payload.message).toContain("Preferred contact method: email, text");
    expect(payload.message).toContain("Project details: Testing the contact form");
  });

  it("renders contact sections with route-aware navigation", () => {
    renderWithProviders(<Contact />, {
      initialEntries: [PageRoute.CONTACT],
    });

    expect(screen.getByTestId("contact-nav")).toHaveAttribute(
      "data-active-page",
      PageRoute.CONTACT
    );
    expect(
      screen.getAllByTestId("contact-section").map((section) => section.dataset.sectionId)
    ).toEqual(["contact-info", "contact-form-section"]);
    expect(screen.getByRole("heading", { name: "Contact Information" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Get in Touch" })).toBeInTheDocument();
    expect(screen.getByTestId("contact-footer")).toBeInTheDocument();
  });

  it("submits the contact form through the normalized API endpoint", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Message sent successfully." }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderWithProviders(<Contact />, {
      initialEntries: [PageRoute.CONTACT],
    });

    await user.click(screen.getByRole("button", { name: /submit mocked contact form/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        })
      );
    });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      name: "Kyle Foster",
      email: "kyle@example.com",
    });
    expect(await screen.findByRole("status")).toHaveTextContent("Message sent successfully.");
  });
});
