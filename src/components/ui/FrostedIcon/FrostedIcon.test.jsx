/**
 * @file src\components\ui\FrostedIcon\FrostedIcon.test.jsx
 * @description src\components\ui\FrostedIcon\FrostedIcon.test module.
 * @module src\components\ui\FrostedIcon\FrostedIcon.test
 */

import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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
 * @description Verifies that the component renders with `role="img"` when not configured as clickable. /
 */
  it("renders an image role when not clickable", () => {
    renderWithProviders(<FrostedIcon icon={faHouse} ariaLabel="Home" clickable={false} />);

    expect(screen.getByRole("img", { name: "Home" })).toBeInTheDocument();
  });
  /**
 * @description Verifies that the component renders with `role="button"` when the `clickable` prop is enabled. /
 */
  it("renders a button role when clickable", () => {
    renderWithProviders(<FrostedIcon icon={faHouse} ariaLabel="Home" clickable />);

    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
  });

  /**
 * @description Verifies that the correct size class is applied to the rendered element. /
 */
  it("applies size class on the rendered element", () => {
    renderWithProviders(
      <FrostedIcon icon={faHouse} ariaLabel="Home" clickable={false} size="xl" />
    );

    expect(screen.getByRole("img", { name: "Home" })).toHaveClass("fi-size-xl");
  });
  /**
 * @description Verifies that the loading state is exposed via `aria-busy` for accessibility tooling. /
 */
  it("exposes aria-busy when loading", () => {
    renderWithProviders(<FrostedIcon icon={faHouse} ariaLabel="Home" loading />);

    expect(screen.getByRole("img", { name: "Home" })).toHaveAttribute("aria-busy", "true");
  });
});
