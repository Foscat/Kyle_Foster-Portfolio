/**
 * Footer.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the Footer component.
 *
 * Covers:
 * - Static content rendering
 * - Social link rendering
 * - Clipboard interaction
 * - Toast notification behavior
 *
 * Notes:
 * - RSuite Toaster is mocked (side-effect only)
 * - useClipboard hook is mocked (logic tested separately)
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Footer from "./index";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock Btn to a simple anchor
vi.mock("components/Btn", () => ({
  default: ({ text, href }) => <a href={href}>{text}</a>,
}));

// Mock useClipboard hook
const copyMock = vi.fn();

vi.mock("assets/hooks/useClipboard", () => ({
  default: () => ({
    copy: copyMock,
    copied: false,
    error: false,
  }),
}));

// Mock RSuite toaster
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
    render(<Footer />);

    expect(screen.getByText(/Phone:/)).toBeInTheDocument();
    expect(screen.getByText(/Phone 2:/)).toBeInTheDocument();
    expect(screen.getByText(/Email:/)).toBeInTheDocument();
  });

  it("renders the current year in the footer", () => {
    render(<Footer />);

    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Social links
   * ------------------------------------------------------------ */

  it("renders GitHub and LinkedIn links", () => {
    render(<Footer />);

    expect(screen.getByText("GitHub")).toHaveAttribute("href", "https://github.com/Foscat");

    expect(screen.getByText("LinkedIn")).toHaveAttribute(
      "href",
      "https://linkedin.com/in/kylefoster-dev"
    );
  });

  /* ------------------------------------------------------------
   * Clipboard interaction
   * ------------------------------------------------------------ */

  it("copies the phone number when clicked", async () => {
    render(<Footer />);

    const phone = screen.getByText("(469) 410-5286");
    await userEvent.click(phone);

    expect(copyMock).toHaveBeenCalledWith("(469) 410-5286");
  });
});
