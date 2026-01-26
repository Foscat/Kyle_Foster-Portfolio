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

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ClickableImg from "components/ClickableImgs";
import renderWithProviders from "tests/renderWithProviders";

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

    await userEvent.click(screen.getByRole("img", { name: IMAGE_ALT }));

    // RSuite Modal renders with role="dialog"
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByText(IMAGE_TITLE)).toBeInTheDocument();
  });

  it("renders the expanded image inside the modal", async () => {
    renderClickableImg();

    await userEvent.click(screen.getByRole("img", { name: IMAGE_ALT }));

    const modalImage = screen.getAllByRole("img", { name: IMAGE_ALT })[1];
    expect(modalImage).toBeInTheDocument();
  });

  it("closes the modal when the expanded image is clicked", async () => {
    renderClickableImg();

    await userEvent.click(screen.getByRole("img", { name: IMAGE_ALT }));

    const modalImage = screen.getAllByRole("img", { name: IMAGE_ALT })[1];
    await userEvent.click(modalImage);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Keyboard accessibility
   * ------------------------------------------------------------ */

  it("closes the modal when Escape is pressed", async () => {
    renderClickableImg();

    await userEvent.click(screen.getByRole("img", { name: IMAGE_ALT }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Accessibility
   * ------------------------------------------------------------ */

  it("provides an accessible name for the thumbnail image", () => {
    renderClickableImg();
    expect(screen.getByRole("img", { name: IMAGE_ALT })).toBeInTheDocument();
  });

  it("sets aria-label when provided", () => {
    renderClickableImg({ ariaLabel: "Expandable screenshot" });

    expect(screen.getByRole("img", { name: "Expandable screenshot" })).toBeInTheDocument();
  });
});
