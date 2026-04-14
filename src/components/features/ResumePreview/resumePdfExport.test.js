/**
 * @file src\components\features\ResumePreview\resumePdfExport.test.js
 * @description Unit tests for resume PDF export pagination and orientation helpers.
 * @module src\components\features\ResumePreview\resumePdfExport.test
 */

import { describe, expect, it } from "vitest";
import { buildPageSlices, getPdfOrientation } from "./resumePdfExport";

describe("resumePdfExport", () => {
  describe("getPdfOrientation", () => {
    it("returns portrait for invalid dimensions", () => {
      expect(getPdfOrientation(0, 100)).toBe("portrait");
      expect(getPdfOrientation(100, 0)).toBe("portrait");
    });

    it("returns portrait for taller layouts and landscape for wider layouts", () => {
      expect(getPdfOrientation(900, 1200)).toBe("portrait");
      expect(getPdfOrientation(1400, 900)).toBe("landscape");
    });
  });

  describe("buildPageSlices", () => {
    it("returns one slice when content fits one page", () => {
      const { slices } = buildPageSlices({
        imageWidthPx: 1200,
        imageHeightPx: 1500,
        pageWidthPt: 595.28,
        pageHeightPt: 841.89,
        marginPt: 24,
      });

      expect(slices).toHaveLength(1);
      expect(Math.round(slices[0].heightPx)).toBe(1500);
    });

    it("splits tall content into multiple slices", () => {
      const { slices } = buildPageSlices({
        imageWidthPx: 1200,
        imageHeightPx: 4800,
        pageWidthPt: 595.28,
        pageHeightPt: 841.89,
        marginPt: 24,
      });

      const summedHeight = slices.reduce((sum, slice) => sum + slice.heightPx, 0);

      expect(slices.length).toBeGreaterThan(1);
      expect(Math.round(summedHeight)).toBe(4800);
    });

    it("returns empty slices for invalid input", () => {
      const { slices, contentWidthPt, contentHeightPt } = buildPageSlices({
        imageWidthPx: 0,
        imageHeightPx: 0,
        pageWidthPt: 595.28,
        pageHeightPt: 841.89,
      });

      expect(slices).toEqual([]);
      expect(contentWidthPt).toBe(0);
      expect(contentHeightPt).toBe(0);
    });
  });
});
