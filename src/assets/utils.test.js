/**
 * @file utils.test.js
 * @description Unit tests for exported asset utility functions.
 * @module tests/assets/utils
 */

import { describe, it, expect } from "vitest";
import * as utils from "./utils";

describe("utils", () => {
  describe("function tests", () => {
    it("should export utility functions", () => {
      expect(utils).toBeDefined();
    });
  });
});
