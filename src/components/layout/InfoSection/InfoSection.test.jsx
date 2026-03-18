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

/**
 * Behavior tests for InfoSection.
 *
 * Boundaries:
 * - Verify semantic behavior and user-discoverable content.
 * - Do not test RSuite panel structure or CSS classes.
 */

// Mock RSuite's Panel to render as a simple section with the expected header and content, allowing us to verify the presence of the title, subtitle, and content without coupling to the implementation details of the RSuite Panel component.
vi.mock("rsuite", () => ({
  Panel: ({ children, header, id, as: Tag = "div", ...rest }) => (
    <Tag id={id} {...rest}>
      {header}
      {children}
    </Tag>
  ),
}));

// Mock FrostedIcon to render a simple span with an aria-hidden label for testing purposes, allowing us to verify that the icon is rendered when the icon prop is provided without relying on the actual rendering of FontAwesome icons. The aria-label includes the icon name to confirm that the correct icon is being rendered.
vi.mock("components/FrostedIcon", () => ({
  default: ({ icon }) => <span aria-label={`Section icon ${String(icon)}`} />,
}));

// The test suite for the InfoSection component, covering semantic structure, conditional rendering of title, subtitle, and icon, and transparent rendering of child content.
describe("InfoSection", () => {
  // Verifies that the component renders a section element with the provided title, subtitle, and content, confirming that the basic structure and content rendering are functioning as expected.
  it("renders a named section with its content", () => {
    renderWithProviders(
      <InfoSection id="about" title="About" subtitle="What I build">
        <p>Readable content</p>
      </InfoSection>
    );

    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /what i build/i })).toBeInTheDocument();
    expect(screen.getByText(/readable content/i)).toBeInTheDocument();
  });

  // Verifies that the component renders an icon when the icon prop is provided, confirming that the conditional rendering of the icon is functioning as expected and that the correct icon is being rendered based on the provided prop.
  it("exposes an icon when one is provided", () => {
    renderWithProviders(
      <InfoSection title="With icon" icon="faStar">
        <p>Body</p>
      </InfoSection>
    );

    expect(screen.getByLabelText(/section icon fastar/i)).toBeInTheDocument();
  });

  // Verifies that the component does not create empty headings when title and subtitle are omitted, confirming that the component handles the absence of these props gracefully. This ensures that the component does not render unnecessary or empty elements when optional props are not provided, and that it still renders the child content correctly.
  it("does not create empty headings when title and subtitle are omitted", () => {
    renderWithProviders(
      <InfoSection>
        <p>Body only</p>
      </InfoSection>
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText(/body only/i)).toBeInTheDocument();
  });
});
