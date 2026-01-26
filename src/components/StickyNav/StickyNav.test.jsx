/**
 * @file StickyNav.test.jsx
 * @description Unit tests for the StickyNav component.
 *
 * Test coverage:
 * - Desktop navigation rendering
 * - Active route highlighting via `aria-current`
 * - Mobile menu toggle behavior
 * - External link rendering
 * - ThemeToggle delegation
 *
 * Testing strategy:
 * - Mocks RSuite navigation primitives to isolate behavior
 * - Mocks Btn, FrostedIcon, and ThemeToggle to avoid UI coupling
 * - Focuses on observable navigation behavior, not layout or styling
 *
 * @module tests/components/StickyNav
 */

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import StickyNav from "components/StickyNav";
import { PageRoute } from "types/ui.types";
import renderWithProviders from "tests/renderWithProviders";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------
 */

// Mock RSuite navigation primitives
vi.mock("rsuite", () => {
  const Nav = ({ children, vertical, className }) => (
    <nav data-testid={vertical ? "mobile-nav" : "desktop-nav"} className={className}>
      {children}
    </nav>
  );

  Nav.Item = ({ children, active, href, disabled }) => (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled ? "true" : undefined}
    >
      {children}
    </a>
  );

  return {
    Navbar: ({ children }) => <header>{children}</header>,
    Nav,
    Tooltip: ({ children }) => <span>{children}</span>,
    Whisper: ({ children }) => <>{children}</>,
  };
});

// Mock Btn (burger menu trigger)
vi.mock("components/Btn", () => ({
  default: ({ onClick, ariaLabel }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      Menu
    </button>
  ),
}));

// Mock FrostedIcon to a minimal label-only span
vi.mock("components/FrostedIcon", () => ({
  default: ({ ariaLabel }) => <span>{ariaLabel}</span>,
}));

// Mock ThemeToggle to a static placeholder
vi.mock("components/ThemeToggle", () => ({
  default: () => <div data-testid="theme-toggle" />,
}));

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("StickyNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------
   * Desktop navigation
   * ------------------------------------------------------------ */

  it("renders the desktop navigation", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);
    expect(screen.getByTestId("desktop-nav")).toBeInTheDocument();
  });

  it("marks the active page correctly", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.PROFESSIONAL} />);

    const activeLink = screen.getByRole("link", { current: "page" });
    expect(activeLink).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Mobile menu toggle
   * ------------------------------------------------------------ */

  it("does not show mobile menu by default", () => {
    renderWithProviders(<StickyNav />);
    expect(screen.queryByTestId("mobile-nav")).not.toBeInTheDocument();
  });

  it("opens the mobile menu when the burger button is clicked", async () => {
    renderWithProviders(<StickyNav />);

    await userEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));

    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * External links
   * ------------------------------------------------------------ */

  it("renders GitHub and LinkedIn links", () => {
    renderWithProviders(<StickyNav />);

    expect(screen.getByRole("link", { name: /link to github/i })).toHaveAttribute(
      "href",
      "https://github.com/Foscat"
    );

    expect(screen.getByRole("link", { name: /linkedin profile/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/kylefoster-dev"
    );
  });

  /* ------------------------------------------------------------
   * Theme toggle delegation
   * ------------------------------------------------------------ */

  it("renders the ThemeToggle component", () => {
    renderWithProviders(<StickyNav />);
    expect(screen.getAllByTestId("theme-toggle").length).toBeGreaterThan(0);
  });
});
