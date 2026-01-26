import React from "react";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "tests/renderWithProviders";
import RichTextBlock from "./RichTextBlock";

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
   * Verifies the component renders nothing when no content is provided.
   * Guards against malformed CMS or configuration input.
   */
  it("renders nothing when no content is provided", () => {
    renderWithProviders(
      <div data-testid="root">
        <RichTextBlock content={null} />
      </div>
    );

    expect(screen.getByTestId("root")).toBeEmptyDOMElement();
  });

  /**
   * Verifies that valid markdown content is rendered into semantic HTML.
   */
  it("renders markdown content", () => {
    renderWithProviders(<RichTextBlock content="# Hello World" />);

    expect(screen.getByRole("heading", { name: "Hello World" })).toBeInTheDocument();
  });
});
