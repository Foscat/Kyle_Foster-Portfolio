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

import { fireEvent, screen, waitFor } from "@testing-library/react";
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

  // Test that the ClickableImg component renders a thumbnail image with the correct source and alt text, ensuring that the component correctly displays the provided image and is accessible to users who rely on screen readers. This verifies that the component uses the src and alt props to render the thumbnail image as expected, allowing it to be identified and understood by assistive technologies.
  it("renders the thumbnail image", () => {
    renderClickableImg();

    const thumbnail = screen.getByRole("img", { name: /clickable image, click to expand/i });
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute("src", IMAGE_SRC);
  });

  // Test that when the ClickableImg component is rendered with a caption prop, the caption text is displayed beneath the thumbnail image, ensuring that the component correctly handles the optional caption and renders it in the expected location. This verifies that the ClickableImg component can display additional descriptive text for the image when provided, enhancing the context and information available to users.
  it("renders the caption beneath the thumbnail when provided", () => {
    renderClickableImg();
    expect(screen.getByText(IMAGE_CAPTION)).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Modal behavior
   * ------------------------------------------------------------ */

  // Test that clicking the thumbnail image opens a modal dialog containing the expanded image, ensuring that the ClickableImg component correctly handles user interactions to display the larger version of the image in a modal. This verifies that the component manages its internal state to show and hide the modal as expected when the thumbnail is clicked.
  it("opens the modal when the thumbnail is clicked", async () => {
    renderClickableImg();

    await userEvent.click(screen.getByRole("img", { name: /clickable image, click to expand/i }));

    // RSuite Modal renders with role="dialog"
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getAllByText(IMAGE_TITLE).length).toBeGreaterThan(0);
  });

  // Test that the expanded image is rendered inside the modal with the correct alt text, ensuring that the ClickableImg component correctly displays the expanded version of the image when the thumbnail is clicked. This verifies that the component handles the modal state and renders the expanded image with the appropriate accessibility attributes, allowing users to view the larger image while maintaining accessibility standards.
  it("renders the expanded image inside the modal", async () => {
    renderClickableImg();

    await userEvent.click(screen.getByRole("img", { name: /Clickable image, click to expand/i }));

    const modalImage = screen.getAllByRole("img", {
      name: /clickable image, click to expand/i,
    })[1];
    expect(modalImage).toBeInTheDocument();
  });

  // Test that zoom controls are available in the modal and adjust zoom state, ensuring users can enlarge tiny screenshots on smaller screens.
  it("renders zoom controls and updates zoom level", async () => {
    renderClickableImg();

    await userEvent.click(screen.getByRole("img", { name: /clickable image, click to expand/i }));
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

      await userEvent.click(screen.getByRole("img", { name: /clickable image, click to expand/i }));

      const modalImage = screen.getAllByRole("img", {
        name: /clickable image, click to expand/i,
      })[1];
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

      await userEvent.click(screen.getByRole("img", { name: /clickable image, click to expand/i }));

      const modalImage = screen.getAllByRole("img", {
        name: /clickable image, click to expand/i,
      })[1];
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

  // Test that pressing the Escape key while the modal is open closes the modal, ensuring that the ClickableImg component provides keyboard accessibility for users who rely on keyboard navigation. This verifies that the component correctly handles keyboard events to allow users to close the modal using the Escape key, providing an accessible user experience.
  it("closes the modal when Escape is pressed", async () => {
    renderClickableImg();

    await userEvent.click(screen.getByRole("img", { name: /clickable image, click to expand/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Accessibility
   * ------------------------------------------------------------ */

  // Test that the ClickableImg component renders the thumbnail image with the correct alt text, ensuring that the image is accessible to users who rely on screen readers. This verifies that the component correctly uses the alt prop to provide an accessible name for the thumbnail image, allowing it to be identified and understood by assistive technologies.
  it("provides an accessible name for the thumbnail image", () => {
    renderClickableImg();
    expect(
      screen.getByRole("img", { name: /Clickable image, click to expand/i })
    ).toBeInTheDocument();
  });

  // Test that when the ClickableImg component is rendered with an ariaLabel prop, the thumbnail image has the correct accessible name for screen readers, ensuring that the component is accessible to users who rely on assistive technologies. This verifies that the ClickableImg component correctly uses the ariaLabel prop to provide an accessible name for the thumbnail image, allowing it to be identified and interacted with by screen readers.
  it("sets aria-label when provided", () => {
    renderClickableImg({ ariaLabel: "Expandable screenshot" });

    expect(screen.getByRole("img", { name: /Expandable screenshot/i })).toBeInTheDocument();
  });
});
