/**
 * @file ClickableImg.test.jsx
 * @description Unit tests for the ClickableImg component.
 *
 * Test coverage:
 * - Thumbnail image rendering
 * - Optional caption rendering
 * - Modal open and close behavior
 * - Expanded image rendering
 * - Keyboard interaction (Escape key)
 * - Accessibility attributes and aria-label handling
 *
 * Testing strategy:
 * - Uses `@testing-library/user-event` to simulate real user interactions
 * - Verifies RSuite Modal behavior via `role="dialog"`
 * - Avoids snapshots in favor of semantic queries
 *
 * @module tests/components/ClickableImg
 */

import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ClickableImg from "./index";
import renderWithProviders from "tests/renderWithProviders";

vi.mock("rsuite", async () => {
  const React = await vi.importActual("react");
  const actual = await vi.importActual("rsuite");
  const Modal = ({ open, children, onClose, keyboard = true }) => {
    React.useEffect(() => {
      if (!open || !keyboard) return undefined;
      const handleKeyDown = (event) => {
        if (event.key === "Escape") onClose?.();
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, keyboard, onClose]);

    return open ? <div role="dialog">{children}</div> : null;
  };
  Modal.Header = ({ children }) => <div>{children}</div>;
  Modal.Title = ({ children }) => <h2>{children}</h2>;
  Modal.Body = ({ children }) => <div>{children}</div>;
  Modal.Footer = ({ children }) => <div>{children}</div>;

  return {
    ...actual,
    Modal,
  };
});

/* ------------------------------------------------------------------
 * Test data
 * ------------------------------------------------------------------ */

const IMAGE_SRC = "https://example.com/image.jpg";
const IMAGE_ALT = "Sample image";
const IMAGE_TITLE = "Expanded Image";
const IMAGE_CAPTION = "This is a caption";

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------
 * Shared render helper to keep test cases concise and readable.
 */

const renderClickableImg = (props = {}) => {
  return renderWithProviders(
    <ClickableImg
      src={IMAGE_SRC}
      alt={IMAGE_ALT}
      title={IMAGE_TITLE}
      caption={IMAGE_CAPTION}
      {...props}
    />
  );
};

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("ClickableImg", () => {
  /* ------------------------------------------------------------
   * Rendering
   * ------------------------------------------------------------ */

  it("renders the thumbnail image", () => {
    renderClickableImg();

    const thumbnail = screen.getByRole("img", { name: IMAGE_ALT });
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute("src", IMAGE_SRC);
  });

  it("renders the caption beneath the thumbnail when provided", () => {
    renderClickableImg();
    expect(screen.getByText(IMAGE_CAPTION)).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Modal behavior
   * ------------------------------------------------------------ */

  it("opens the modal when the thumbnail is clicked", async () => {
    renderClickableImg();

    await userEvent.click(
      screen.getByRole("button", { name: /clickable image, click to expand/i })
    );

    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getAllByText(IMAGE_TITLE).length).toBeGreaterThan(0);
  });

  it("renders the expanded image inside the modal", async () => {
    renderClickableImg();

    await userEvent.click(
      screen.getByRole("button", { name: /Clickable image, click to expand/i })
    );

    const modalImage = within(screen.getByRole("dialog")).getByRole("img", {
      name: /clickable image, click to expand/i,
    });
    expect(modalImage).toBeInTheDocument();
  });

  it("renders zoom controls and updates zoom level", async () => {
    renderClickableImg();

    await userEvent.click(
      screen.getByRole("button", { name: /clickable image, click to expand/i })
    );
    await userEvent.click(screen.getByRole("button", { name: /zoom in image/i }));
    expect(screen.getByRole("button", { name: /reset image zoom/i })).toHaveTextContent("125%");
  });

  it("requests landscape mode for wide images on mobile and unlocks on close", async () => {
    const previousInnerWidth = window.innerWidth;
    const previousMatchMedia = window.matchMedia;
    const previousOrientation = window.screen.orientation;

    const lock = vi.fn(() => Promise.resolve());
    const unlock = vi.fn();

    window.innerWidth = 375;
    window.matchMedia = vi.fn((query) => ({
      matches: query === "(orientation: portrait)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => true),
    }));
    Object.defineProperty(window.screen, "orientation", {
      configurable: true,
      value: { lock, unlock },
    });

    try {
      renderClickableImg();

      await userEvent.click(
        screen.getByRole("button", { name: /clickable image, click to expand/i })
      );

      const modalImage = within(screen.getByRole("dialog")).getByRole("img", {
        name: /clickable image, click to expand/i,
      });
      Object.defineProperty(modalImage, "naturalWidth", { configurable: true, value: 1920 });
      Object.defineProperty(modalImage, "naturalHeight", { configurable: true, value: 1080 });
      fireEvent.load(modalImage);

      await waitFor(() => {
        expect(lock).toHaveBeenCalledWith("landscape");
      });

      await userEvent.keyboard("{Escape}");

      await waitFor(() => {
        expect(unlock).toHaveBeenCalledTimes(1);
      });
    } finally {
      window.innerWidth = previousInnerWidth;
      window.matchMedia = previousMatchMedia;
      Object.defineProperty(window.screen, "orientation", {
        configurable: true,
        value: previousOrientation,
      });
    }
  });

  it("shows a fallback hint when auto-rotate cannot be enabled", async () => {
    const previousInnerWidth = window.innerWidth;
    const previousMatchMedia = window.matchMedia;
    const previousOrientation = window.screen.orientation;

    const lock = vi.fn(() => Promise.reject(new Error("orientation denied")));
    const unlock = vi.fn();

    window.innerWidth = 375;
    window.matchMedia = vi.fn((query) => ({
      matches: query === "(orientation: portrait)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => true),
    }));
    Object.defineProperty(window.screen, "orientation", {
      configurable: true,
      value: { lock, unlock },
    });

    try {
      renderClickableImg();

      await userEvent.click(
        screen.getByRole("button", { name: /clickable image, click to expand/i })
      );

      const modalImage = within(screen.getByRole("dialog")).getByRole("img", {
        name: /clickable image, click to expand/i,
      });
      Object.defineProperty(modalImage, "naturalWidth", { configurable: true, value: 1920 });
      Object.defineProperty(modalImage, "naturalHeight", { configurable: true, value: 1080 });
      fireEvent.load(modalImage);

      await waitFor(() => {
        expect(screen.getByText(/auto-rotate is unavailable/i)).toBeInTheDocument();
      });

      expect(unlock).not.toHaveBeenCalled();
    } finally {
      window.innerWidth = previousInnerWidth;
      window.matchMedia = previousMatchMedia;
      Object.defineProperty(window.screen, "orientation", {
        configurable: true,
        value: previousOrientation,
      });
    }
  });

  /* ------------------------------------------------------------
   * Keyboard accessibility
   * ------------------------------------------------------------ */

  it("opens the modal when the thumbnail button is keyboard-activated", async () => {
    const user = userEvent.setup();
    renderClickableImg();

    await user.tab();
    expect(screen.getByRole("button", { name: /clickable image, click to expand/i })).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("closes the modal when Escape is pressed", async () => {
    renderClickableImg();

    await userEvent.click(
      screen.getByRole("button", { name: /clickable image, click to expand/i })
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Accessibility
   * ------------------------------------------------------------ */

  it("provides an accessible name for the thumbnail button", () => {
    renderClickableImg();
    expect(
      screen.getByRole("button", { name: /Clickable image, click to expand/i })
    ).toBeInTheDocument();
  });

  it("sets aria-label when provided", () => {
    renderClickableImg({ ariaLabel: "Expandable screenshot" });

    expect(screen.getByRole("button", { name: /Expandable screenshot/i })).toBeInTheDocument();
  });
});
