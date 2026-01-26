import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import ImageGalleryBlock from "./ImageGalleryBlock";

/**
 * @file ImageGalleryBlock.test.jsx
 * @description Unit tests for the ImageGalleryBlock component.
 *
 * Testing focus:
 * - Defensive rendering behavior when image data is missing or invalid
 * - Basic thumbnail rendering with correct accessibility attributes
 *
 * Design intent:
 * This block is intentionally simple and defensive. Tests verify that:
 * - The component fails silently when no images are provided
 * - Valid image data renders accessible `<img>` elements
 *
 * @module tests/components/blocks/ImageGalleryBlock
 */

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("ImageGalleryBlock", () => {
  /**
   * Verifies the component renders nothing when `images` is null.
   * This guards against malformed CMS or data-driven input.
   */
  it("renders nothing if images is missing", () => {
    renderWithProviders(
      <div data-testid="root">
        <ImageGalleryBlock images={null} />
      </div>
    );

    expect(screen.getByTestId("root")).toBeEmptyDOMElement();
  });

  /**
   * Verifies that a valid images array renders accessible image elements.
   */
  it("renders an image list", () => {
    renderWithProviders(
      <ImageGalleryBlock
        images={[
          { src: "/img1.jpg", alt: "Image 1" },
          { src: "/img2.jpg", alt: "Image 2" },
        ]}
      />
    );

    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Image 2")).toBeInTheDocument();
  });
});
