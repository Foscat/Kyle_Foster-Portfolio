/**
 * @file utils.js
 * @description Collection of shared utility helpers used across the application.
 * These functions are intentionally small, side-effect free, and reusable.
 * @module assets/utils
 */

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
