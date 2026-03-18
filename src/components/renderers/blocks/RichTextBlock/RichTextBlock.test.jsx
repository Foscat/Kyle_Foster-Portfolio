import React from "react";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "tests/renderWithProviders";
import RichTextBlock from ".";

/**
 * @file RichTextBlock.test.jsx
 * @description Unit tests for the RichTextBlock component.
 *
 * Testing focus:
 * - Defensive rendering behavior when content is missing or invalid
 * - Correct rendering of markdown content into semantic HTML
 *
 * Design intent:
 * RichTextBlock is expected to be tolerant of missing data while still
 * correctly rendering valid markdown input.
 *
 * @module tests/components/blocks/RichTextBlock
 */

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("RichTextBlock", () => {
  /**
   * Verifies that the component renders nothing when no content is provided.
   * This confirms that the component is handling null or undefined content gracefully without throwing errors or rendering empty elements.
   */
  it("renders nothing when no content is provided", () => {
    renderWithProviders(<RichTextBlock content={null} />);
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  /**
   * Verifies the component renders a named region with readable paragraph content when valid markdown input is provided.
   * This confirms that the markdown parsing and rendering logic is functioning as intended.
   */
  it("renders a named region with readable paragraph content", () => {
    renderWithProviders(
      <RichTextBlock
        id="intro"
        title="Overview"
        content={[{ type: "p", children: [{ type: "text", text: "Hello world" }] }]}
      />
    );

    expect(screen.getByRole("region", { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});
