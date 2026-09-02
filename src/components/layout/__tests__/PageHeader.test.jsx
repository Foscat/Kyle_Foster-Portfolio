/**
 * @file PageHeader.test.jsx
 * @description Unit tests for the PageHeader component.
 *
 * Test coverage:
 * - Required title rendering
 * - Optional jobTitle + timespan row composition
 * - Optional subtitle rendering
 * - Semantic page header without a nested banner landmark
 * - Root className passthrough
 *
 * Testing strategy:
 * - Focuses on semantic output and composition logic
 * - Avoids coupling to presentational CSS details
 *
 * @module tests/components/PageHeader
 */

import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PageHeader from "../PageHeader";
import renderWithProviders from "tests/renderWithProviders";

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("PageHeader", () => {
  /* ------------------------------------------------------------
   * Required content
   * ------------------------------------------------------------ */

  it("renders the main title", () => {
    renderWithProviders(<PageHeader title="My Page Title" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("My Page Title");
  });

  /* ------------------------------------------------------------
   * Job title + timespan
   * ------------------------------------------------------------ */

  it("renders job title and timespan joined with a separator", () => {
    renderWithProviders(
      <PageHeader title="Experience" jobTitle="Frontend Developer" timespan="2021–2024" />
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Frontend Developer / 2021–2024"
    );
  });

  it("renders only job title when timespan is omitted", () => {
    renderWithProviders(<PageHeader title="Experience" jobTitle="Frontend Developer" />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Frontend Developer");
  });

  it("renders only timespan when job title is omitted", () => {
    renderWithProviders(<PageHeader title="Experience" timespan="2021–2024" />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("2021–2024");
  });

  it("does not render job/timespan row when both are missing", () => {
    renderWithProviders(<PageHeader title="Experience" />);

    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Subtitle
   * ------------------------------------------------------------ */

  it("renders the subtitle when provided", () => {
    renderWithProviders(
      <PageHeader title="About" subTitle="This section describes my background" />
    );

    expect(screen.getByText("This section describes my background")).toBeInTheDocument();
  });

  it("does not render subtitle when omitted", () => {
    renderWithProviders(<PageHeader title="About" />);

    expect(screen.queryByText(/describes/i)).not.toBeInTheDocument();
  });

  it("renders a custom technology label when provided", () => {
    renderWithProviders(
      <PageHeader
        title="Project"
        techLabel="Focus Areas"
        tech={[{ label: "Interface Systems Lab", type: "front" }]}
      />
    );

    expect(
      screen.getByText((_, node) => node?.classList.contains("tech-used") === true)
    ).toHaveTextContent("Focus Areas: Interface Systems Lab");
  });

  /* ------------------------------------------------------------
   * Semantics & attributes
   * ------------------------------------------------------------ */

  it("renders a semantic header without declaring another page banner", () => {
    renderWithProviders(<PageHeader title="Home" />);

    const header = screen.getByRole("banner");
    expect(header).not.toHaveAttribute("role");
  });

  it("applies custom className to the root element", () => {
    renderWithProviders(<PageHeader title="Title" subTitle="Subtitle" className="custom-class" />);

    expect(screen.getByRole("banner")).toHaveClass("custom-class");
  });
});
