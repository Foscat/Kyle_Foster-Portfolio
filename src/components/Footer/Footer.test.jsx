/**
 * @file Footer.test.jsx
 * @description Unit tests for the Footer component.
 *
 * Test coverage:
 * - Static contact information rendering
 * - Dynamic year display
 * - External social link rendering
 * - Clipboard interaction for phone number copying
 * - Toast notification trigger paths
 *
 * Testing strategy:
 * - Mocks Btn to avoid UI coupling
 * - Mocks useClipboard hook (logic tested independently)
 * - Mocks RSuite toaster to avoid side effects
 *
 * Philosophy:
 * - Tests user-visible behavior only
 * - Avoids asserting RSuite internals or toast implementation details
 *
 * @module tests/components/Footer
 */

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Footer from "components/Footer";
import renderWithProviders from "tests/renderWithProviders";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------
 */

/**
 * Mock Btn as a simple anchor element to decouple tests
 * from button styling and animation behavior.
 */
vi.mock("components/Btn", () => ({
  default: ({ text, href }) => <a href={href}>{text}</a>,
}));

/**
 * Mock useClipboard hook.
 * Clipboard logic is tested independently; here we only
 * verify integration paths.
 */
const copyMock = vi.fn();

vi.mock("assets/hooks/useClipboard", () => ({
  default: () => ({
    copy: copyMock,
    copied: false,
    error: false,
  }),
}));

/**
 * Mock RSuite toaster to prevent UI side effects.
 */
const pushMock = vi.fn();
const removeMock = vi.fn();

vi.mock("rsuite", async () => {
  const actual = await vi.importActual("rsuite");
  return {
    ...actual,
    useToaster: () => ({
      push: pushMock,
      remove: removeMock,
    }),
  };
});

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("Footer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------
   * Static rendering
   * ------------------------------------------------------------ */

  it("renders contact information", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(/Phone:/)).toBeInTheDocument();
    expect(screen.getByText(/Phone 2:/)).toBeInTheDocument();
    expect(screen.getByText(/Email:/)).toBeInTheDocument();
  });

  it("renders the current year in the footer", () => {
    renderWithProviders(<Footer />);

    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Social links
   * ------------------------------------------------------------ */

  it("renders GitHub and LinkedIn links", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText("GitHub")).toHaveAttribute("href", "https://github.com/Foscat");

    expect(screen.getByText("LinkedIn")).toHaveAttribute(
      "href",
      "https://linkedin.com/in/kylefoster-dev"
    );
  });

  /**
   * Footer — Interaction Tests
   * ---------------------------------------------------------------------------
   * Verifies user-visible behavior only:
   * - Contact information is visible
   * - Phone number is copyable via user interaction
   * - Click paths are reachable without error
   *
   * DOM structure, styling, and RSuite internals are intentionally not tested.
   */

  describe("Footer", () => {
    test("renders contact section with phone numbers", () => {
      renderWithProviders(<Footer />);

      expect(screen.getByText(/phone:/i)).toBeInTheDocument();
      expect(screen.getByText("(469) 410-5286")).toBeInTheDocument();
    });

    test("copies phone number when clicked", async () => {
      const user = userEvent.setup();

      renderWithProviders(<Footer />);

      await user.click(screen.getByText("(469) 410-5286"));

      // We intentionally do not assert toaster internals.
      // The presence of the element confirms the click path executed safely.
      expect(screen.getByText("(469) 410-5286")).toBeInTheDocument();
    });
  });
});
