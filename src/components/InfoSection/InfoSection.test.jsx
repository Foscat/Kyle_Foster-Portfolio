import React from "react";
import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import InfoSection from "./index";

/**
 * @file InfoSection.test.jsx
 * @description Unit tests for the InfoSection layout component.
 *
 * Testing focus:
 * - Correct semantic wrapper element (`section`)
 * - Proper application of root classes and IDs
 * - Conditional rendering of title, subtitle, and icon
 * - Transparent rendering of child content
 *
 * Testing strategy:
 * - Mocks RSuite Panel to reduce surface area and DOM complexity
 * - Mocks FrostedIcon to avoid FontAwesome rendering concerns
 * - Focuses on layout and composition, not styling details
 *
 * @module tests/components/InfoSection
 */

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Keep RSuite surface-area minimal for unit tests.
vi.mock("rsuite", () => ({
  Panel: ({ children, header, id, className, as = "div", ...rest }) => {
    const Tag = as;
    return (
      <Tag data-testid="info-panel" id={id} className={className} {...rest}>
        <div data-testid="info-header">{header}</div>
        {children}
      </Tag>
    );
  },
}));

// Avoid FontAwesome/render complexity.
vi.mock("components/FrostedIcon", () => ({
  default: ({ icon, className }) => (
    <span data-testid="frosted-icon" className={className}>
      {String(icon)}
    </span>
  ),
}));

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("InfoSection", () => {
  /**
   * Verifies that InfoSection renders a semantic `section` wrapper
   * with the expected root class and ID.
   */
  it("renders a section wrapper with the expected root class", () => {
    renderWithProviders(
      <InfoSection id="about" title="About">
        <p>Body</p>
      </InfoSection>
    );

    const panel = screen.getByTestId("info-panel");
    expect(panel.tagName.toLowerCase()).toBe("section");
    expect(panel).toHaveAttribute("id", "about");
    expect(panel).toHaveClass("info-section");
  });

  /**
   * Verifies that title, subtitle, and child content are rendered
   * when provided.
   */
  it("renders title, subtitle, and children", () => {
    renderWithProviders(
      <InfoSection title="Title" subtitle="Subtitle">
        <p>Child content</p>
      </InfoSection>
    );

    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Subtitle" })).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  /**
   * Verifies that an icon is rendered when the `icon` prop is supplied.
   */
  it("renders an icon when provided", () => {
    renderWithProviders(
      <InfoSection title="With icon" icon="faStar">
        <p>Body</p>
      </InfoSection>
    );

    expect(screen.getByTestId("frosted-icon")).toHaveTextContent("faStar");
  });

  /**
   * Verifies that empty title or subtitle values do not produce
   * empty heading elements.
   */
  it("does not render empty title/subtitle headings", () => {
    renderWithProviders(
      <InfoSection>
        <p>Body</p>
      </InfoSection>
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
});
