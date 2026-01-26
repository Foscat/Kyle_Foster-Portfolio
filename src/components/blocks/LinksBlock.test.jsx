import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import LinksBlock from "./LinksBlock";

/**
 * @file LinksBlock.test.jsx
 * @description Unit tests for the LinksBlock component.
 *
 * Testing focus:
 * - Defensive rendering behavior when link data is missing
 * - Correct rendering of anchor elements with expected attributes
 *
 * Design intent:
 * LinksBlock is intentionally minimal and data-driven.
 * These tests ensure it:
 * - Fails silently when provided with invalid input
 * - Renders accessible anchor elements when valid data is supplied
 *
 * @module tests/components/blocks/LinksBlock
 */

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("LinksBlock", () => {
  /**
   * Verifies the component renders nothing when `links` is null.
   * Guards against malformed CMS or configuration input.
   */
  it("renders nothing if links are missing", () => {
    renderWithProviders(
      <div data-testid="root">
        <LinksBlock links={null} />
      </div>
    );

    expect(screen.getByTestId("root")).toBeEmptyDOMElement();
  });

  /**
   * Verifies that valid link data produces accessible anchor elements
   * with the expected href attributes.
   */
  it("renders a list of links", () => {
    renderWithProviders(
      <LinksBlock
        links={[
          { label: "GitHub", url: "https://github.com" },
          { label: "Website", url: "https://example.com" },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com"
    );
    expect(screen.getByRole("link", { name: "Website" })).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });
});
