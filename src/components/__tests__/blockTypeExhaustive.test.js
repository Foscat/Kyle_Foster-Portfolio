import { describe, it, expect } from "vitest";
import { BlockType } from "types/ui.types";

/**
 * If you add a new BlockType, you must update:
 * - SectionRenderer switch
 * - tests in SectionRenderer.test.jsx
 */
describe("BlockType exhaustiveness", () => {
  it("should only contain supported block types", () => {
    const supported = new Set([
      BlockType.RICH_TEXT,
      BlockType.IMAGE_GALLERY,
      BlockType.LINKS,
      BlockType.BULLETED_LIST,
      BlockType.DIAGRAM,
    ]);

    const actual = new Set(Object.values(BlockType));
    for (const type of actual) {
      expect(supported.has(type)).toBe(true);
    }
  });
});
