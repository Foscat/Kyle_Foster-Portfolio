/**
 * @file VideoBlock.test.jsx
 * @description Behavior tests for accessible, user-controlled product video playback.
 * @module components/renderers/blocks/VideoBlock/VideoBlock.test
 */

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import renderWithProviders from "tests/renderWithProviders";
import VideoBlock from "./index.jsx";

describe("VideoBlock", () => {
  it("renders user-controlled inline video without autoplay", () => {
    renderWithProviders(
      <VideoBlock
        id="product-promo"
        title="Product demonstration"
        src="/promo.mp4"
        mimeType="video/mp4"
        caption="A concise product walkthrough."
        ariaLabel="Product demonstration video"
      />
    );

    const video = screen.getByLabelText("Product demonstration video");
    const source = screen.getByTestId("video-source");

    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).not.toHaveAttribute("autoplay");
    expect(source).toHaveAttribute("src", "/promo.mp4");
    expect(source).toHaveAttribute("type", "video/mp4");
    expect(screen.getByText("A concise product walkthrough.")).toBeInTheDocument();
  });

  it("renders nothing when the video source is missing", () => {
    const { container } = renderWithProviders(
      <VideoBlock title="Unavailable demonstration" src="" />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
