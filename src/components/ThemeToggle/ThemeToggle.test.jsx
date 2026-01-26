import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./index";
import { renderWithProviders } from "tests/renderWithProviders";
import { Theme } from "types/ui.types";

/**
 * @file ThemeToggle.test.jsx
 * @description Unit tests for the ThemeToggle component.
 *
 * Testing focus:
 * - Rendering of both light and dark theme toggle buttons
 * - Theme state transitions when toggles are activated
 * - Presence of accessible button labels
 *
 * Testing philosophy:
 * - Verifies observable behavior only
 * - Avoids asserting internal DOM structure or RSuite implementation details
 * - Treats theme state as a global side effect via `data-theme`
 *
 * @module tests/components/ThemeToggle
 */

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("ThemeToggle", () => {
  /**
   * Verifies that both theme toggle buttons are rendered and
   * accessible by role and label.
   */
  test("renders light and dark theme toggle buttons", () => {
    renderWithProviders(<ThemeToggle />);

    expect(screen.getByRole("button", { name: /light theme/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /dark theme/i })).toBeInTheDocument();
  });

  /**
   * Verifies that clicking the dark theme toggle updates the
   * global document theme state.
   */
  test("switches to dark theme when dark button is clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: /dark theme/i }));

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe(Theme.DARK);
    });
  });

  /**
   * Verifies that clicking the light theme toggle updates the
   * global document theme state.
   */
  test("switches to light theme when light button is clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeToggle />, {
      initialEntries: ["/"],
    });

    await user.click(screen.getByRole("button", { name: /light theme/i }));

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe(Theme.LIGHT);
    });
  });
});
