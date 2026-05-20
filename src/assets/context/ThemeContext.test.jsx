/**
 * @file ThemeContext.test.jsx
 * @description Regression tests for ThemeContext runtime safety and input validation.
 * @module assets/context/ThemeContext.test
 */

import { screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "tests/renderWithProviders";
import { useTheme } from "./ThemeContext";

function ThemeContextProbe() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p data-testid="theme-value">{theme}</p>
      <button type="button" onClick={() => setTheme("light")}>
        Set light theme
      </button>
      <button type="button" onClick={() => setTheme("invalid-theme")}>
        Set invalid theme
      </button>
    </div>
  );
}

describe("ThemeContext", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
    delete document.documentElement.dataset.mode;
    delete document.documentElement.dataset.palette;
  });

  test("falls back to dark theme when storage read fails", async () => {
    window.localStorage.setItem("portfolio-theme", "light");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage read blocked");
    });

    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });

  test("ignores invalid theme updates", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    await user.click(screen.getByRole("button", { name: /set invalid theme/i }));
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });

  test("applies theme changes even when storage writes fail", async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage write blocked");
    });

    renderWithProviders(<ThemeContextProbe />);

    await user.click(screen.getByRole("button", { name: /set light theme/i }));
    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  test("cycles theme with Alt+Shift+T hotkey", async () => {
    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");

    fireEvent.keyDown(window, { key: "T", altKey: true, shiftKey: true });
    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");

    fireEvent.keyDown(window, { key: "T", altKey: true, shiftKey: true });
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });

  test("ignores theme hotkey while typing in editable controls", async () => {
    renderWithProviders(
      <div>
        <ThemeContextProbe />
        <input aria-label="note" />
      </div>
    );

    const input = screen.getByRole("textbox", { name: /note/i });
    input.focus();

    fireEvent.keyDown(input, { key: "T", altKey: true, shiftKey: true });
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });
});
