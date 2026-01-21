import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ThemeToggle from "./index";
import { Theme } from "types/ui.types";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock ThemeContext
const setThemeMock = vi.fn();

vi.mock("assets/theme/ThemeContext", () => ({
  useTheme: () => ({
    theme: Theme.LIGHT,
    setTheme: setThemeMock,
  }),
}));

// Mock Btn to a simple button preserving aria-label + click behavior
vi.mock("components/Btn", () => ({
  default: ({ ariaLabel, onClick }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      {ariaLabel}
    </button>
  ),
}));

// Mock RSuite ButtonGroup as a semantic wrapper
vi.mock("rsuite", () => ({
  ButtonGroup: ({ children, ...rest }) => <div {...rest}>{children}</div>,
}));

/* ------------------------------------------------------------------
 * Tests
 * ------------------------------------------------------------------ */

describe("ThemeToggle", () => {
  beforeEach(() => {
    setThemeMock.mockClear();
  });

  it("renders both theme toggle buttons", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("button", { name: /light theme/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /dark theme/i })).toBeInTheDocument();
  });

  it("sets light theme when light button is clicked", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: /light theme/i }));

    expect(setThemeMock).toHaveBeenCalledWith(Theme.LIGHT);
  });

  it("sets dark theme when dark button is clicked", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: /dark theme/i }));

    expect(setThemeMock).toHaveBeenCalledWith(Theme.DARK);
  });
});
