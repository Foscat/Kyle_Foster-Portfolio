import { useCallback, useState } from "react";

/**
 * useClipboard
 * ---------------------------------------------------------------------------
 * React hook for copying text to the system clipboard.
 *
 * Features:
 * - Async-safe
 * - Graceful fallback handling
 * - Success / error state tracking
 * - Optional auto-reset timeout
 *
 * @param {object} [options]
 * @param {number} [options.resetDelay=2000] - Time (ms) before copied state resets.
 * @returns {{
 *   copy: (text: string) => Promise<boolean>,
 *   copied: boolean,
 *   error: Error | null
 * }}
 */
const useClipboard = ({ resetDelay = 2000 } = {}) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const copy = useCallback(
    async (text) => {
      if (typeof text !== "string" || !text.length) {
        return false;
      }

      try {
        if (!navigator?.clipboard?.writeText) {
          throw new Error("Clipboard API not supported");
        }

        await navigator.clipboard.writeText(text);

        setCopied(true);
        setError(null);

        if (resetDelay > 0) {
          setTimeout(() => setCopied(false), resetDelay);
        }

        return true;
      } catch (err) {
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
