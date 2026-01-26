/**
 * @file Btn.test.jsx
 * @description Unit tests for the `Btn` (Frosted Glass Button) component.
 *
 * Test coverage:
 * - Basic rendering and text output
 * - Default variant and size behavior
 * - Variant and size overrides
 * - Click interaction and disabled behavior
 * - Loading state behavior
 * - Icon-only button behavior and accessibility enforcement
 *
 * Design intent:
 * These tests ensure `Btn` behaves as a robust, accessible abstraction
 * over RSuite Button / IconButton, enforcing:
 * - Predictable defaults
 * - Safe async interaction
 * - Strict accessibility guarantees for icon-only usage
 *
 * @module tests/components/Btn
 */

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Btn from "components/Btn";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Variant, Size } from "types/ui.types";
import renderWithProviders from "tests/renderWithProviders";

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------
 * Shared render helper to keep test cases concise and consistent.
 */

const renderBtn = (props = {}) => {
  return renderWithProviders(<Btn text="Test Button" {...props} />);
};

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("Btn", () => {
  /* ------------------------------------------------------------
   * Rendering
   * ------------------------------------------------------------ */

  it("renders without crashing", () => {
    renderBtn();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders provided text", () => {
    renderBtn({ text: "Click Me" });
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Default behavior
   * ------------------------------------------------------------ */

  it("uses primary variant by default", () => {
    renderBtn();
    expect(screen.getByRole("button")).toHaveClass("primary");
  });

  it("uses medium size by default", () => {
    renderBtn();
    expect(screen.getByRole("button")).toHaveAttribute("data-size", Size.MD);
  });

  /* ------------------------------------------------------------
   * Variants & sizes
   * ------------------------------------------------------------ */

  it("applies the correct variant class", () => {
    renderBtn({ variant: Variant.ACCENT });
    expect(screen.getByRole("button")).toHaveClass("accent");
  });

  it("passes size prop to RSuite button", () => {
    renderBtn({ size: Size.LG });
    expect(screen.getByRole("button")).toHaveAttribute("data-size", Size.LG);
  });

  /* ------------------------------------------------------------
   * Interaction
   * ------------------------------------------------------------ */

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    renderBtn({ onClick });

    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    renderBtn({ onClick, disabled: true });

    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  /* ------------------------------------------------------------
   * Loading state
   * ------------------------------------------------------------ */

  it("shows loading state and prevents interaction", async () => {
    const onClick = vi.fn();
    renderBtn({ loading: true, onClick });

    const button = screen.getByRole("button");
    expect(button).toHaveClass("loading");

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  /* ------------------------------------------------------------
   * Icon-only buttons
   * ------------------------------------------------------------ */

  it("renders as icon-only when icon is provided without text", () => {
    renderWithProviders(<Btn icon={faDownload} ariaLabel="Download file" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("icon-only");
  });

  it("requires aria-label for icon-only buttons", () => {
    renderWithProviders(<Btn icon={faDownload} ariaLabel="Download" />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Download");
  });

  /* ------------------------------------------------------------
   * Accessibility
   * ------------------------------------------------------------ */

  it("sets aria-busy when loading", () => {
    renderBtn({ loading: true });
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("sets aria-disabled when disabled", () => {
    renderBtn({ disabled: true });
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });
});
