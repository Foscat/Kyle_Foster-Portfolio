/**
 * @file src\tests\helpers\clickAndExpectPrevented.js
 * @description src\tests\helpers\clickAndExpectPrevented module.
 * @module src\tests\helpers\clickAndExpectPrevented
 */

import { fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";

export function clickAndExpectPrevented(element) {
  const preventDefault = vi.fn();
  fireEvent.click(element, { preventDefault });
  expect(preventDefault).toHaveBeenCalled();
}
