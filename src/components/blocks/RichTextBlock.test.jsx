/**
 * RichTextBlock.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the RichTextBlock component.
 *
 * Covers:
 * - Defensive rendering
 * - Title rendering
 * - Paragraph rendering
 * - Accessibility roles
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RichTextBlock from "./RichTextBlock";

/* ------------------------------------------------------------------
 * Test data
 * ------------------------------------------------------------------ */

const PARAGRAPHS = ["This is the first paragraph.", "This is the second paragraph."];

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("RichTextBlock", () => {
  it("returns null when paragraphs are missing or empty", () => {
    const { container } = render(<RichTextBlock paragraphs={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the title when provided", () => {
    render(<RichTextBlock title="Overview" paragraphs={PARAGRAPHS} />);

    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("renders all paragraphs", () => {
    render(<RichTextBlock paragraphs={PARAGRAPHS} />);

    PARAGRAPHS.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("renders a region role for accessibility", () => {
    render(<RichTextBlock title="Content" paragraphs={PARAGRAPHS} />);

    expect(screen.getByRole("region")).toBeInTheDocument();
  });
});
