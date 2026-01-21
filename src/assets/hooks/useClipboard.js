import { useCallback, useState } from "react";

/**
 * useClipboard
 * ---------------------------------------------------------------------------
 * React hook that provides a safe, asynchronous interface for copying text
 * to the system clipboard using the Web Clipboard API.
 *
 * This hook abstracts away browser API quirks and exposes a simple state-driven
 * contract suitable for UI feedback (e.g., tooltips, toasts, icons).
 *
 * Capabilities:
 * - Asynchronous clipboard writes
 * - Graceful handling of unsupported browsers
 * - Explicit success and error state tracking
 * - Optional automatic reset of the copied state
 *
 * Design notes:
 * - Uses the modern `navigator.clipboard.writeText` API
 * - Does not attempt legacy fallbacks (e.g., `execCommand`)
 * - Returns a boolean to allow calling code to branch on success/failure
 *
 * Typical use cases:
 * - “Copy to clipboard” buttons
 * - Shareable links or code snippets
 * - Developer tooling and utilities
 *
 * @param {Object} [options]
 *   Optional configuration object.
 *
 * @param {number} [options.resetDelay=2000]
 *   Duration in milliseconds before the `copied` state automatically resets
 *   to `false`. Set to `0` or a negative value to disable auto-reset.
 *
 * @returns {Object}
 *   Clipboard interaction helpers and state.
 *
 * @returns {function(string): Promise<boolean>} returns.copy
 *   Asynchronously copies the provided string to the clipboard.
 *   Resolves to `true` on success and `false` on failure.
 *
 * @returns {boolean} returns.copied
 *   Indicates whether the most recent copy operation succeeded.
 *
 * @returns {Error|null} returns.error
 *   Error object if the last copy attempt failed, otherwise `null`.
 */
const useClipboard = ({ resetDelay = 2000 } = {}) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Attempts to copy the provided text to the clipboard.
   *
   * @param {string} text
   *   The text content to copy.
   *
   * @returns {Promise<boolean>}
   *   Resolves to `true` if the copy succeeds, otherwise `false`.
   */
  const copy = useCallback(
    (text) => {
      // Guard against invalid input
      if (typeof text !== "string" || !text.length) {
        return false;
      }

      try {
        // Ensure Clipboard API availability
        if (!navigator?.clipboard?.writeText) {
          throw new Error("Clipboard API not supported");
        }

        navigator.clipboard.writeText(text);

        setCopied(true);
        setError(null);

        // Automatically reset copied state if configured
        if (resetDelay > 0) {
          setTimeout(() => setCopied(false), resetDelay);
        }

        return true;
      } catch (err) {
        console.debug({ err });
        setError(err);
        setCopied(false);
        return false;
      }
    },
    [resetDelay]
  );

  return {
    copy,
    copied,
    error,
  };
};

export default useClipboard;
