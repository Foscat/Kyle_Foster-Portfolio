/**
 * InfoSection.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the InfoSection component.
 *
 * Covers:
 * - Title and subtitle rendering
 * - Optional icon rendering
 * - Children composition
 * - Section semantics (as="section")
 * - Defensive rendering behavior
 *
 * Notes:
 * - RSuite Panel is treated as a layout primitive (not tested internally)
 * - FrostedIcon is mocked (delegation only)
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import InfoSection from "./index";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock RSuite Panel to a semantic wrapper
vi.mock("rsuite", () => ({
  Panel: ({ header, children, ...rest }) => (
    <section data-testid="panel" {...rest}>
      {header}
      {children}
    </section>
  ),
}));

// Mock FrostedIcon (already tested separately)
vi.mock("components/FrostedIcon", () => ({
  default: ({ icon }) => <span data-testid="icon">{icon.iconName}</span>,
}));

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("InfoSection", () => {
  /* ------------------------------------------------------------
   * Basic rendering
   * ------------------------------------------------------------ */

  it("renders children content", () => {
    render(
      <InfoSection>
        <p>Inner content</p>
      </InfoSection>
    );

    expect(screen.getByText("Inner content")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Title & subtitle
   * ------------------------------------------------------------ */

  it("renders the title when provided", () => {
    render(
      <InfoSection title="Section Title">
        <div />
      </InfoSection>
    );

    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(
      <InfoSection subtitle="Helpful subtitle">
        <div />
      </InfoSection>
    );

    expect(screen.getByText("Helpful subtitle")).toBeInTheDocument();
  });

  it("does not render title or subtitle when omitted", () => {
    render(
      <InfoSection>
        <div />
      </InfoSection>
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Icon rendering
   * ------------------------------------------------------------ */

  it("renders a FrostedIcon when icon prop is provided", () => {
    render(
      <InfoSection title="With Icon" icon={faCoffee}>
        <div />
      </InfoSection>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("does not render icon when icon prop is not provided", () => {
    render(
      <InfoSection title="No Icon">
        <div />
      </InfoSection>
    );

    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Semantics & attributes
   * ------------------------------------------------------------ */

  it("renders as a section element", () => {
    const { container } = render(
      <InfoSection>
        <div />
      </InfoSection>
    );

    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("applies the provided id to the section", () => {
    render(
      <InfoSection id="about-me">
        <div />
      </InfoSection>
    );

    expect(document.getElementById("about-me")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * ClassName passthrough
   * ------------------------------------------------------------ */

  it("applies custom className to the section", () => {
    const { container } = render(
      <InfoSection className="custom-class">
        <div />
      </InfoSection>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
