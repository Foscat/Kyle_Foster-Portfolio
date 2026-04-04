/**
 * @file useLongPress.js
 * @description
 * Custom React hook for detecting long-press interactions on an element. It provides a simple API to execute a callback function when a long-press is detected, with support for both mouse and touch events. The hook allows for a configurable threshold duration to define what constitutes a long-press.
 * This hook is useful for implementing features like context menus, drag-and-drop, or any interaction that requires a sustained press on an element.
 *
 * Capabilities:
 * - Detects long-press interactions for both mouse and touch events
 * - Configurable threshold duration for long-press detection
 * - Provides a simple API for integrating long-press functionality into any component
 * Usage:
 * const longPressHandlers = useLongPress(() => {
 *   // Handle long-press action here
 * }, 700);
 * @module assets/hooks/useLongPress
 */

import { useRef } from "react";

/**
 * @public
 * @function useLongPress
 * @description
 * Custom React hook that detects long-press interactions on an element. It accepts a callback function to be executed when a long-press is detected, and an optional threshold duration (defaulting to 500 milliseconds) that defines how long the press must be held before the callback is triggered. The hook returns event handlers that can be attached to any element to enable long-press detection for both mouse and touch interactions.
 *
 * @param {Function} callback - The function to be executed when a long-press is detected.
 * @param {number} threshold - The duration (in milliseconds) that defines a long-press. Defaults to 500ms.
 * @returns {Object} Event handlers for long-press detection.
 *
 * Capabilities:
 * - Detects long-press interactions for both mouse and touch events
 * - Configurable threshold duration for long-press detection
 * - Provides a simple API for integrating long-press functionality into any component
 *
 * Usage:
 * const longPressHandlers = useLongPress(() => {
 *   // Handle long-press action here
 * }, 700);

 */
const useLongPress = (callback, threshold = 500) => {
  const timeoutRef = useRef(null);

  // Starts the long-press timer on mouse down or touch start.
  const start = () => {
    timeoutRef.current = setTimeout(() => {
      callback();
    }, threshold);
  };

  // Clears the long-press timer on mouse up or touch end.
  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Returns event handlers to be attached to the target element.
  return {
    onMouseDown: start,
    onMouseUp: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
};

export default useLongPress;
