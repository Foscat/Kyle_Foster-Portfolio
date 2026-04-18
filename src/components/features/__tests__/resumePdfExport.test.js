/**
 * @file src\components\features\ResumePreview\resumePdfExport.test.js
 * @description Unit tests for resume PDF export pagination and orientation helpers.
 * @module src\components\features\ResumePreview\resumePdfExport.test
 */

import { describe, expect, it, vi } from "vitest";
import {
  buildPageSlices,
  fillTransparentCanvasPixels,
  getPdfOrientation,
  trimTransparentCanvasMargins,
} from "../ResumePreview/resumePdfExport";

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

    it("prefers low-complexity rows near page boundaries", () => {
      const imageHeightPx = 3200;
      const baselineSlices = buildPageSlices({
        imageWidthPx: 1200,
        imageHeightPx,
        pageWidthPt: 595.28,
        pageHeightPt: 841.89,
        marginPt: 24,
      }).slices;
      const baselineFirstSliceHeight = Math.floor(baselineSlices[0].heightPx);
      const desiredBreakY = baselineFirstSliceHeight - 80;
      const rowComplexityScores = new Float32Array(imageHeightPx);
      rowComplexityScores.fill(1000);

      for (let y = desiredBreakY - 10; y <= desiredBreakY + 10; y += 1) {
        rowComplexityScores[y] = 0;
      }

      const { slices } = buildPageSlices({
        imageWidthPx: 1200,
        imageHeightPx,
        pageWidthPt: 595.28,
        pageHeightPt: 841.89,
        marginPt: 24,
        rowComplexityScores,
      });

      expect(slices.length).toBeGreaterThan(1);
      expect(slices[0].heightPx).toBeGreaterThan(desiredBreakY - 18);
      expect(slices[0].heightPx).toBeLessThan(desiredBreakY + 18);
      expect(slices[0].heightPx).toBeLessThan(baselineFirstSliceHeight);
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

  describe("trimTransparentCanvasMargins", () => {
    it("returns the original canvas when all pixels are visible", () => {
      const source = document.createElement("canvas");
      source.width = 3;
      source.height = 2;
      source.getContext = vi.fn().mockReturnValue({
        getImageData: () => ({
          data: new Uint8ClampedArray([
            0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255,
          ]),
        }),
      });

      const result = trimTransparentCanvasMargins(source);

      expect(result).toBe(source);
    });

    it("crops transparent outer margins", () => {
      const source = document.createElement("canvas");
      source.width = 4;
      source.height = 2;
      source.getContext = vi.fn().mockReturnValue({
        getImageData: () => ({
          data: new Uint8ClampedArray([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            255, 0, 0, 0, 255,
          ]),
        }),
      });

      const trimmed = document.createElement("canvas");
      const drawImage = vi.fn();
      trimmed.getContext = vi.fn().mockReturnValue({ drawImage });

      const originalCreateElement = document.createElement.bind(document);
      const createElementSpy = vi
        .spyOn(document, "createElement")
        .mockImplementation((tagName, options) => {
          if (String(tagName).toLowerCase() === "canvas") {
            return trimmed;
          }

          return originalCreateElement(tagName, options);
        });

      try {
        const result = trimTransparentCanvasMargins(source);

        expect(result).toBe(trimmed);
        expect(trimmed.width).toBe(2);
        expect(trimmed.height).toBe(2);
        expect(drawImage).toHaveBeenCalledWith(source, 2, 0, 2, 2, 0, 0, 2, 2);
      } finally {
        createElementSpy.mockRestore();
      }
    });
  });

  describe("fillTransparentCanvasPixels", () => {
    it("returns the original canvas when there are no transparent pixels", () => {
      const source = document.createElement("canvas");
      source.width = 2;
      source.height = 1;
      source.getContext = vi.fn().mockReturnValue({
        getImageData: () => ({
          data: new Uint8ClampedArray([0, 0, 0, 255, 0, 0, 0, 255]),
        }),
      });

      const result = fillTransparentCanvasPixels(source, "rgb(2, 4, 6)");

      expect(result).toBe(source);
    });

    it("fills transparent pixels using the provided background color", () => {
      const source = document.createElement("canvas");
      source.width = 2;
      source.height = 1;
      source.getContext = vi.fn().mockReturnValue({
        getImageData: () => ({
          data: new Uint8ClampedArray([0, 0, 0, 0, 0, 0, 0, 255]),
        }),
      });

      const flattened = document.createElement("canvas");
      const fillRect = vi.fn();
      const drawImage = vi.fn();
      const flattenedContext = { fillStyle: "", fillRect, drawImage };
      flattened.getContext = vi.fn().mockReturnValue(flattenedContext);

      const originalCreateElement = document.createElement.bind(document);
      const createElementSpy = vi
        .spyOn(document, "createElement")
        .mockImplementation((tagName, options) => {
          if (String(tagName).toLowerCase() === "canvas") {
            return flattened;
          }

          return originalCreateElement(tagName, options);
        });

      try {
        const result = fillTransparentCanvasPixels(source, "rgb(2, 4, 6)");

        expect(result).toBe(flattened);
        expect(flattened.width).toBe(2);
        expect(flattened.height).toBe(1);
        expect(flattenedContext.fillStyle).toBe("rgb(2, 4, 6)");
        expect(fillRect).toHaveBeenCalledWith(0, 0, 2, 1);
        expect(drawImage).toHaveBeenCalledWith(source, 0, 0);
      } finally {
        createElementSpy.mockRestore();
      }
    });
  });
});
