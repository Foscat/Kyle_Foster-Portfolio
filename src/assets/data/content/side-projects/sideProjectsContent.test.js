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
      "https://foscat.github.io/layout-style-css/"
    );
    expect(urlsByTitle.get("View Demo")).toBe("https://foscat.github.io/layout-style-css/");
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
