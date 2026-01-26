import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import FrostedIcon from "./index";

/**
 * @file FrostedIcon.test.jsx
 * @description Unit tests for the FrostedIcon component.
 *
 * Testing focus:
 * - Semantic role switching based on `clickable` prop
 * - Size-related CSS class application
 * - Loading state accessibility signaling
 *
 * Design intent:
 * FrostedIcon is a low-level visual primitive that must:
 * - Render correct semantic roles (`img` vs `button`)
 * - Expose loading state via `aria-busy`
 * - Apply predictable, size-based CSS classes
 *
 * These tests validate observable DOM behavior rather than internal logic.
 *
 * @module tests/components/FrostedIcon
 */

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("FrostedIcon", () => {
  /**
   * Verifies that the component renders with `role="img"` when
   * not configured as clickable.
   */
  it("renders an image role when not clickable", () => {
    renderWithProviders(
      <FrostedIcon icon={{ prefix: "fas", iconName: "home" }} label="Home" clickable={false} />
    );

    const icon = screen.getByRole("img", { name: "Home" });
    expect(icon).toBeInTheDocument();
  });

  /**
   * Verifies that the component renders with `role="button"` when
   * the `clickable` prop is enabled.
   */
  it("renders a button role when clickable", () => {
    renderWithProviders(
      <FrostedIcon icon={{ prefix: "fas", iconName: "home" }} label="Home" clickable />
    );

    const btn = screen.getByRole("button", { name: "Home" });
    expect(btn).toBeInTheDocument();
  });

  /**
   * Verifies that the correct size class is applied to the rendered element.
   */
  it("applies size class on the rendered element", () => {
    renderWithProviders(
      <FrostedIcon
        icon={{ prefix: "fas", iconName: "home" }}
        label="Home"
        clickable={false}
        size="xl"
      />
    );

    const icon = screen.getByRole("img", { name: "Home" });
    expect(icon).toHaveClass("fi-size-xl");
  });

  /**
   * Verifies that the loading state is exposed via `aria-busy`
   * for accessibility tooling.
   */
  it("exposes aria-busy when loading", () => {
    renderWithProviders(
      <FrostedIcon icon={{ prefix: "fas", iconName: "home" }} label="Home" loading />
    );

    const icon = screen.getByRole("img", { name: "Home" });
    expect(icon).toHaveAttribute("aria-busy", "true");
  });
});
