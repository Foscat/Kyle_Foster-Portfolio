/**
 * @file src\pages\__tests__\Contact.test.jsx
 * @description Regression tests for the current content-driven Contact page.
 * @module src\pages\__tests__\Contact.test
 */

import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

import Contact from "../Contact/index.jsx";
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
    </section>
  ),
}));

/**
 * The Contact page now delegates its body to the section renderer, so this suite
 * verifies composition rather than the removed ContactAlt form implementation.
 */
describe("Contact page", () => {
  it("renders the current contact section with route-aware navigation", () => {
    renderWithProviders(<Contact />, {
      initialEntries: [PageRoute.CONTACT],
    });

    expect(screen.getByTestId("contact-nav")).toHaveAttribute(
      "data-active-page",
      PageRoute.CONTACT
    );
    expect(screen.getByTestId("contact-section")).toHaveAttribute(
      "data-section-id",
      "contact-info"
    );
    expect(screen.getByRole("heading", { name: "Contact Information" })).toBeInTheDocument();
    expect(screen.getByTestId("contact-footer")).toBeInTheDocument();
  });
});
