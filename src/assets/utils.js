/**
 * @file utils.js
 * @description Collection of shared utility helpers used across the application.
 * These functions are intentionally small, side-effect free, and reusable.
 * @module assets/utils
 */

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - Input string.
 * @returns {string} String with the first letter capitalized.
 *
 * @example
 * capFirstLetter("hello world"); // "Hello world"
 */
export function capFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).trim();
}

/**
 * Safely joins multiple class name values into a single string.
 * Falsy values are ignored.
 *
 * @param {...(string|false|null|undefined)} classes - Class name values to join.
 * @returns {string} Space-delimited class name string.
 *
 * @example
 * classNames("btn", isActive && "active")
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a string of class names by trimming whitespace, normalizing spaces, removing duplicates, and eliminating newlines. Returned string is suitable for use in a `className` attribute by stripping out unnessicary blanks.
 *
 * @param {string} classStrBlock - A string of space-delimited class names.
 * @returns {string} The formatted string with whitespace normalized and duplicates removed.
 */
export function formatClassNames(classStrBlock = "") {
  if (typeof classStrBlock !== "string") {
    console.warn("formatClassNames: Expected a string but received:", classStrBlock);
    return "";
  } else if (classStrBlock.trim() === "") {
    return "";
  } else {
    // Coerce input to string to avoid errors when null/number is passed
    const input = typeof classStrBlock === "string" ? classStrBlock : String(classStrBlock);
    // Remove newline characters first and replace them with spaces
    const noNewlines = input.replace(/\n/g, " ");
    // Trim leading and trailing whitespace and collapse multiple whitespace into a single space
    const normalized = noNewlines.trim().replace(/\s+/g, " ");
    // Remove duplicate class names while preserving order and ignore empty tokens
    const uniqueClasses = [...new Set(normalized.split(" ").filter(Boolean))].join(" ");
    return uniqueClasses;
  }
}

/**
 * Determines whether the code is executing in a browser environment.
 * Useful for guarding DOM or window access during SSR or tests.
 *
 * @returns {boolean} True if `window` is defined.
 */
export function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * No-op function used as a default callback placeholder.
 *
 * @returns {void}
 */
export function noop() {}

/**
 * Clamps a numeric value between a minimum and maximum.
 *
 * @param {number} value - Input value.
 * @param {number} min - Lower bound.
 * @param {number} max - Upper bound.
 * @returns {number} Clamped value.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns a debounced version of a function.
 * The function is invoked only after the delay has elapsed since the last call.
 *
 * @param {Function} fn - Function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {Function} Debounced function.
 */
export function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
