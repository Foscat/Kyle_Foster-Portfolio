/**
 * @file src/assets/data/content/side-projects/sideProjectsContent.test.js
 * @description Static contract tests for the Side Projects content registry.
 * @module assets/data/content/side-projects/sideProjectsContent.test
 */

import { describe, expect, it } from "vitest";
import { BlockType } from "types/ui.types.js";
import sideProjectSections from "./index.js";

const getSection = (sectionId) => sideProjectSections.find((section) => section.id === sectionId);

const getLinksBlock = (section) =>
  section?.blocks?.find((block) => block?.type === BlockType.LINKS) ?? null;

const getImageGalleryBlock = (section) =>
  section?.blocks?.find((block) => block?.type === BlockType.IMAGE_GALLERY) ?? null;

const getLinkUrlsByTitle = (linksBlock) =>
  new Map((linksBlock?.items ?? []).map((item) => [item.title, item.url]));

describe("side projects content", () => {
  it("includes Layout Style CSS beside the other shared CSS libraries", () => {
    const sectionIds = sideProjectSections.map((section) => section.id);
    const uiStyleKitIndex = sectionIds.indexOf("ui-style-kit-css");
    const layoutStyleIndex = sectionIds.indexOf("layout-style-css");
    const mernTemplateIndex = sectionIds.indexOf("mern-template");
    const layoutStyleSection = getSection("layout-style-css");

    expect(layoutStyleIndex).toBeGreaterThan(uiStyleKitIndex);
    expect(layoutStyleIndex).toBeLessThan(mernTemplateIndex);
    expect(layoutStyleSection).toMatchObject({
      id: "layout-style-css",
      slug: "layout-style-css",
      title: "Layout Style CSS",
      isScroller: true,
    });
  });

  it("exposes Layout Style CSS source, package, documentation, and demo links", () => {
    const layoutStyleSection = getSection("layout-style-css");
    const links = getLinksBlock(layoutStyleSection);
    const urlsByTitle = getLinkUrlsByTitle(links);

    expect(links?.id).toBe("layout-style-links");
    expect(urlsByTitle.get("View Source Code")).toBe("https://github.com/Foscat/layout-style-css");
    expect(urlsByTitle.get("View NPM Package")).toBe(
      "https://www.npmjs.com/package/layout-style-css"
    );
    expect(urlsByTitle.get("Read Documentation")).toBe(
      "https://foscat.github.io/Layout-Style-CSS/"
    );
    expect(urlsByTitle.get("View Demo")).toBe("https://foscat.github.io/Layout-Style-CSS/");
  });

  it("explains the Layout Style CSS bundle logic with a Mermaid diagram", () => {
    const layoutStyleSection = getSection("layout-style-css");
    const diagrams = (layoutStyleSection?.blocks ?? []).filter(
      (block) => block?.type === BlockType.DIAGRAM
    );
    const layoutBundleDiagram = diagrams.find(
      (block) => block?.id === "diagram-layout-style-bundle-flow"
    );

    expect(layoutBundleDiagram).toBeTruthy();
    expect(JSON.stringify(layoutBundleDiagram)).toContain("layout-style-css");
    expect(JSON.stringify(layoutBundleDiagram)).toContain("ui-style-kit-css");
    expect(JSON.stringify(layoutBundleDiagram)).toContain("interactive-surface-css");
  });

  it("removes Caesar's Enigma from the Side Projects registry", () => {
    const sectionIds = sideProjectSections.map((section) => section.id);
    const sectionContent = JSON.stringify(sideProjectSections);

    expect(sectionIds).not.toContain("enigma");
    expect(sectionContent).not.toMatch(/Caesar's Enigma|caesars-enigma|#enigma/u);
  });

  it("promotes Layout Style CSS as the UI bundle layout layer", () => {
    const layoutStyleSection = getSection("layout-style-css");
    const sectionContent = JSON.stringify(layoutStyleSection);
    const imageGallery = getImageGalleryBlock(layoutStyleSection);

    expect(sectionContent).toContain("layout-style-css@1.1.2");
    expect(sectionContent).toContain("ui-style-kit-css");
    expect(sectionContent).toContain("interactive-surface-css");
    expect(sectionContent).toContain(".ly-wrapper");
    expect(sectionContent).toContain(".ly-section");
    expect(sectionContent).toContain(".ly-stack");
    expect(sectionContent).toContain(".ly-grid");
    expect(sectionContent).toContain(".ly-sidebar-layout");
    expect(imageGallery?.items?.map((item) => item.id)).toContain("layout_style_social_card_img");
  });

  it("keeps every Side Projects link block wired to an explicit destination", () => {
    const linkItems = sideProjectSections.flatMap((section) =>
      (section.blocks ?? [])
        .filter((block) => block?.type === BlockType.LINKS)
        .flatMap((block) =>
          (block.items ?? []).map((item) => ({
            sectionId: section.id,
            blockId: block.id,
            ...item,
          }))
        )
    );

    expect(linkItems.length).toBeGreaterThan(0);
    linkItems.forEach((item) => {
      expect(item.url, `${item.sectionId}/${item.blockId}/${item.id}`).toMatch(
        /^(https?:\/\/|\/|#)/u
      );
      expect(item.title, `${item.sectionId}/${item.blockId}/${item.id}`).toEqual(
        expect.any(String)
      );
    });
  });
});
