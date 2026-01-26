import { expect } from "vitest";

export function expectAriaCurrent(element) {
  expect(element).toHaveAttribute("aria-current", "page");
}
