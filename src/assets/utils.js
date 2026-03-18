/**
 * @file utils.js
 * @description Collection of shared utility helpers used across the application.
 * These functions are intentionally small, side-effect free, and reusable.
 * @module assets/utils
 */

/**
 * @function capFirstLetter
 * @description
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
 * @function classNames
 * @description
 * Joins multiple class name values into a single string, filtering out falsy values.
 * Safely joins multiple class name values into a single string.
 * Falsy values are ignored.
 *
 * @param {...(string|false|null|undefined)} classes - Class name values to join.
 * @returns {string} Space-delimited class name string.
 *
 * @example
 * classNames("btn", isActive && "active"); // "btn active"
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * @function formatClassNames
 * @description
 * Formats a string of class names by trimming whitespace, normalizing spaces, removing duplicates, and eliminating newlines. Returned string is suitable for use in a `className` attribute by stripping out unnecessary blanks.
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
 * @function isBrowser
 * @description
 * Determines if the current execution context is a browser environment by checking for the presence of the `window` object. This is useful for guarding against code that should only run in the browser, such as DOM manipulation or accessing browser-specific APIs, especially when rendering on the server or during testing.
 *
 * @returns {boolean} True if `window` is defined.
 */
export function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * @function noop
 * @description
 * No-op function used as a default callback placeholder.
 *
 * @returns {void}
 */
export function noop() {}

/**
 * @function clamp
 * @description
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
 * @function debounce
 * @description
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

const UNKNOWN_LOG_LOCATION = "unknown:0";

/**
 * @function getCallerLocation
 * @description
 * Extracts the caller's file and line number from the stack trace for logging purposes.
 * This function creates a new Error to capture the stack trace, then parses it to find the relevant frame.
 *
 * @returns {string} A string representing the caller's file and line number, or "unknown:0" if it cannot be determined.
 */
function getCallerLocation() {
  const error = {};

  // Capture the stack trace, excluding this function from the trace to get the caller's location
  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, getCallerLocation);
  } else {
    error.stack = new Error().stack;
  }

  /// Parse the stack trace to find the caller's location
  const stack = error.stack;
  if (!stack) return UNKNOWN_LOG_LOCATION;

  // The stack trace format can vary, but typically the caller's frame is around the 3rd or 4th line
  const frames = stack.split("\n");
  const frame = frames[3] || frames[2];
  if (!frame) return UNKNOWN_LOG_LOCATION;

  // Extract the file path and line number from the frame
  let location = frame.trim();
  const atIndex = location.indexOf("at ");
  if (atIndex !== -1) location = location.slice(atIndex + 3).trim();

  // Handle cases where the location is wrapped in parentheses (e.g. "at func (file:line:col)")
  const openParen = location.lastIndexOf("(");
  const closeParen = location.lastIndexOf(")");
  if (openParen !== -1 && closeParen !== -1 && closeParen > openParen) {
    location = location.slice(openParen + 1, closeParen);
  }

  // Extract just the file name and line number, removing any preceding path
  const lastSlash = Math.max(location.lastIndexOf("/"), location.lastIndexOf("\\"));
  const fileLineCol = lastSlash !== -1 ? location.slice(lastSlash + 1) : location;

  // Remove column number if present (e.g. "file.js:10:15" -> "file.js:10")
  const lastColon = fileLineCol.lastIndexOf(":");
  const secondLastColon = lastColon === -1 ? -1 : fileLineCol.lastIndexOf(":", lastColon - 1);
  if (secondLastColon === -1) return fileLineCol || UNKNOWN_LOG_LOCATION;

  // Return the file name and line number, excluding the column number
  return fileLineCol.slice(0, lastColon);
}

/**
 * @function logger
 * @description
 * Logger utility that provides timestamped, leveled logging with caller location.
 * Each log entry includes the log level, timestamp, and the file/line of the caller.
 * This enhances debugging by providing context about where logs are coming from.
 *
 * Example usage:
 * logger.info("This is an info message");
 */
function logWithLevel(level, method, args) {
  const timestamp = new Date().toISOString();
  const location = getCallerLocation();
  method(`${timestamp} [${level}] [${location}]`, ...args);
}

// Export a logger object with methods for different log levels
export const logger = {
  info(...args) {
    logWithLevel("INFO", console.info, args);
  },
  warn(...args) {
    logWithLevel("WARN", console.warn, args);
  },
  error(...args) {
    logWithLevel("ERROR", console.error, args);
  },
};
