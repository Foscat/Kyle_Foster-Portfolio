/**
 * PageHeader.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the PageHeader component.
 *
 * Covers:
 * - Required title rendering
 * - Optional jobTitle + timespan row
 * - Optional subtitle rendering
 * - Semantic role (banner)
 * - ClassName passthrough
 *
 * Notes:
 * - RSuite Panel and FlexboxGrid are mocked as layout primitives
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PageHeader from "./index";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock RSuite components to simple semantic wrappers
vi.mock("rsuite", () => {
  const FlexboxGrid = ({ children }) => <div>{children}</div>;
  FlexboxGrid.Item = ({ children }) => <div>{children}</div>;

  return {
    Panel: ({ children, className, role }) => (
      <header className={className} role={role}>
        {children}
      </header>
    ),
    FlexboxGrid,
  };
});

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("PageHeader", () => {
  /* ------------------------------------------------------------
   * Required content
   * ------------------------------------------------------------ */

  it("renders the main title", () => {
    render(<PageHeader title="My Page Title" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("My Page Title");
  });

  /* ------------------------------------------------------------
   * Job title + timespan
   * ------------------------------------------------------------ */

  it("renders job title and timespan joined with a separator", () => {
    render(<PageHeader title="Experience" jobTitle="Frontend Developer" timespan="2021–2024" />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Frontend Developer • 2021–2024"
    );
  });

  it("renders only job title when timespan is omitted", () => {
    render(<PageHeader title="Experience" jobTitle="Frontend Developer" />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Frontend Developer");
  });

  it("renders only timespan when job title is omitted", () => {
    render(<PageHeader title="Experience" timespan="2021–2024" />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("2021–2024");
  });

  it("does not render job/timespan row when both are missing", () => {
    render(<PageHeader title="Experience" />);

    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Subtitle
   * ------------------------------------------------------------ */

  it("renders the subtitle when provided", () => {
    render(<PageHeader title="About" subTitle="This section describes my background" />);

    expect(screen.getByText("This section describes my background")).toBeInTheDocument();
  });

  it("does not render subtitle when omitted", () => {
    render(<PageHeader title="About" />);

    expect(screen.queryByText(/describes/i)).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Semantics & attributes
   * ------------------------------------------------------------ */

  it("renders with role='banner' for accessibility", () => {
    render(<PageHeader title="Home" />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("applies custom className to the root element", () => {
    const { container } = render(<PageHeader title="Home" className="custom-class" />);

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
