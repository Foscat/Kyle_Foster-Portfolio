/**
 * @file src\tests\helpers\expectAriaCurrent.js
 * @description src\tests\helpers\expectAriaCurrent module.
 * @module src\tests\helpers\expectAriaCurrent
 */

import { expect } from "vitest";

export function expectAriaCurrent(element) {
  expect(element).toHaveAttribute("aria-current", "page");
}
