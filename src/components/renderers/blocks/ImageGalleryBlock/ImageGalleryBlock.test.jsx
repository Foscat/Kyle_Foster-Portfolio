/**
 * @file src\components\renderers\blocks\ImageGalleryBlock\ImageGalleryBlock.test.jsx
 * @description src\components\renderers\blocks\ImageGalleryBlock\ImageGalleryBlock.test module.
 * @module src\components\renderers\blocks\ImageGalleryBlock\ImageGalleryBlock.test
 */

import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import ImageGalleryBlock from ".";

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
 * @description Verifies the component renders nothing when `images` is null. This guards against malformed CMS or data-driven input. /
 */
  it("renders nothing if images is missing", () => {
    renderWithProviders(
      <div data-testid="root">
        <ImageGalleryBlock items={null} />
      </div>
    );

    expect(screen.getByTestId("root")).toBeEmptyDOMElement();
  });

  /**
 * @description Verifies that a valid images array renders accessible image elements. /
 */
  it("renders an image list", async () => {
    renderWithProviders(
      <ImageGalleryBlock
        items={[
          { src: "/img1.jpg", alt: "Image 1" },
          { src: "/img2.jpg", alt: "Image 2" },
        ]}
      />
    );

    expect(await screen.findByAltText("Image 1")).toBeInTheDocument();
    expect(await screen.findByAltText("Image 2")).toBeInTheDocument();
  });
});
