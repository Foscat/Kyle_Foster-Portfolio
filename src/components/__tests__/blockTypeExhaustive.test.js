/**
 * @file src\components\__tests__\blockTypeExhaustive.test.js
 * @description src\components\__tests__\blockTypeExhaustive.test module.
 * @module src\components\__tests__\blockTypeExhaustive.test
 */

import { describe, it, expect } from "vitest";
import { BlockType } from "types/ui.types";

/**
 * @description Runtime exhaustiveness guard for supported block types. If a new block type is added, this test forces the renderer and test suite to be updated explicitly. /
 */

describe("BlockType exhaustiveness", () => {
  it("matches the set of block types supported by the rendering system", () => {
    const supported = new Set([
      BlockType.RICH_TEXT,
      BlockType.IMAGE_GALLERY,
      BlockType.LINKS,
      BlockType.BULLETED_LIST,
      BlockType.CARD_GRID,
      BlockType.DIAGRAM,
      BlockType.FORM,
      BlockType.HERO,
      BlockType.MARKDOWN_DOCS,
    ]);

    expect(new Set(Object.values(BlockType))).toEqual(supported);
  });
});
