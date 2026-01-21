/**
 * ImageGalleryBlock.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the ImageGalleryBlock component.
 *
 * Covers:
 * - Defensive rendering
 * - Rendering of image thumbnails
 * - Delegation to ClickableImg
 * - Panel header rendering
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ImageGalleryBlock from "./ImageGalleryBlock";

/* ------------------------------------------------------------------
 * Mock ClickableImg (modal behavior tested elsewhere)
 * ------------------------------------------------------------------ */

vi.mock("components/ClickableImg", () => ({
  default: ({ alt }) => <img alt={alt} />,
}));

/* ------------------------------------------------------------------
 * Test data
 * ------------------------------------------------------------------ */

const IMAGES = [
  {
    id: "img-1",
    src: "/image1.jpg",
    alt: "Image One",
  },
  {
    id: "img-2",
    src: "/image2.jpg",
    alt: "Image Two",
  },
];

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("ImageGalleryBlock", () => {
  it("returns null when no images are provided", () => {
    const { container } = render(<ImageGalleryBlock images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the gallery title when provided", () => {
    render(<ImageGalleryBlock title="Gallery" images={IMAGES} />);

    expect(screen.getByText("Gallery")).toBeInTheDocument();
  });

  it("renders a ClickableImg for each image", () => {
    render(<ImageGalleryBlock images={IMAGES} />);

    expect(screen.getByAltText("Image One")).toBeInTheDocument();
    expect(screen.getByAltText("Image Two")).toBeInTheDocument();
  });
});
