/**
 * @file pageMetas.test.js
 * @description Compatibility contracts for the full route metadata registry.
 * @module assets/data/pageMetas.test
 */

import { describe, expect, it } from "vitest";
import pageMetas from "./pageMetas.js";

describe("full page metadata", () => {
  it("includes every public case-study route represented by page summaries", () => {
    expect(pageMetas.SandersonTechnologyEnterprises.url).toBe("/sanderson-technology-enterprises");
    expect(pageMetas.SandersonTechnologyEnterprises.sections).not.toHaveLength(0);
  });
});
