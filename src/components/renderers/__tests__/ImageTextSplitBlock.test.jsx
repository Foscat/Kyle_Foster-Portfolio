/**
 * @file src\components\renderers\blocks\ImageTextSplitBlock\ImageTextSplitBlock.test.jsx
 * @description src\components\renderers\blocks\ImageTextSplitBlock\ImageTextSplitBlock.test module.
 * @module src\components\renderers\blocks\ImageTextSplitBlock\ImageTextSplitBlock.test
 */

import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import ImageTextSplitBlock from "../blocks/ImageTextSplitBlock";

describe("ImageTextSplitBlock", () => {
  it("renders nothing when image src is missing", () => {
    renderWithProviders(
      <div data-testid="root">
        <ImageTextSplitBlock image={{ alt: "Missing source" }} content={[{ type: "p" }]} />
      </div>
    );

    expect(screen.getByTestId("root")).toBeEmptyDOMElement();
  });

  it("renders image and content when data is valid", async () => {
    renderWithProviders(
      <ImageTextSplitBlock
        id="profile-block"
        title="Profile"
        image={{
          src: "/profile.jpg",
          alt: "Profile image",
          caption: "Profile caption",
        }}
        imagePosition="right"
        content={[{ type: "p", children: [{ type: "text", text: "Hello split block" }] }]}
      />
    );

    expect(screen.getByRole("img", { name: /profile image/i })).toBeInTheDocument();
    expect(await screen.findByText(/hello split block/i)).toBeInTheDocument();
  });

  it("renders caption when showCaption is true", async () => {
    renderWithProviders(
      <ImageTextSplitBlock
        id="caption-block"
        image={{ src: "/profile.jpg", alt: "Profile image", caption: "Profile caption" }}
        showCaption={true}
        content={[{ type: "p", children: [{ type: "text", text: "With caption" }] }]}
      />
    );

    expect(screen.getByText(/profile caption/i)).toBeInTheDocument();
  });

  it("hides caption by default even when caption data exists", () => {
    renderWithProviders(
      <ImageTextSplitBlock
        id="no-caption-block"
        image={{ src: "/profile.jpg", alt: "Profile image", caption: "Should be hidden" }}
        content={[{ type: "p", children: [{ type: "text", text: "No caption" }] }]}
      />
    );

    expect(screen.queryByText(/should be hidden/i)).not.toBeInTheDocument();
  });
});
