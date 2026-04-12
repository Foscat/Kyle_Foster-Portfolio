/**
 * @file chunkLoadRecovery.js
 * @description Detects recoverable JS chunk load failures (usually stale hashed assets after deploy)
 * and performs a single hard reload to recover without trapping users in a reload loop.
 * @module assets/chunkLoadRecovery
 */

const CHUNK_RELOAD_SESSION_KEY = "portfolio-chunk-reload-attempt";
const DEFAULT_MAX_RELOADS = 1;

const DYNAMIC_IMPORT_FAILURE_PATTERNS = [
  /Failed to fetch dynamically imported module/i,
  /Importing a module script failed/i,
  /Loading chunk [\d]+ failed/i,
];

/**
 * @function isLikelyChunkLoadFailure
 * @description Determines whether an error payload matches a recoverable chunk-load failure.
 * Extension errors and unrelated runtime errors should not match this guard.
 *
 * @param {Object} payload - Error-like payload.
 * @param {string} [payload.message] - Error message text.
 * @param {string} [payload.filename] - Error filename from `window.onerror`.
 * @param {string} [payload.targetSrc] - Script src from `ErrorEvent.target`.
 * @returns {boolean} True when the payload indicates a likely deploy-time chunk mismatch.
 */
export function isLikelyChunkLoadFailure({ message = "", filename = "", targetSrc = "" } = {}) {
  const combinedMessage = String(message || "");
  const sources = [String(filename || ""), String(targetSrc || "")];

  if (DYNAMIC_IMPORT_FAILURE_PATTERNS.some((pattern) => pattern.test(combinedMessage))) {
    return true;
  }

  // Script element load failure for hashed Vite chunks.
  return sources.some((source) => /\/assets\/[^/]+\.js(?:\?.*)?$/i.test(source));
}

const safeReadReloadCount = (storage) => {
  try {
    const raw = storage.getItem(CHUNK_RELOAD_SESSION_KEY);
    const parsed = Number.parseInt(raw ?? "0", 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  } catch {
    return 0;
  }
};

const safeWriteReloadCount = (storage, value) => {
  try {
    storage.setItem(CHUNK_RELOAD_SESSION_KEY, String(value));
  } catch {
    // Ignore storage errors in hardened browser modes.
  }
};

const safeClearReloadCount = (storage) => {
  try {
    storage.removeItem(CHUNK_RELOAD_SESSION_KEY);
  } catch {
    // Ignore storage errors in hardened browser modes.
  }
};

/**
 * @function installChunkLoadRecovery
 * @description Installs global listeners for recoverable chunk-load failures.
 * On first failure in a browsing session, triggers a hard reload.
 *
 * @param {Object} [options]
 * @param {Window} [options.win=window] - Window-like object used for listener registration.
 * @param {number} [options.maxReloads=1] - Max automatic reload attempts per session.
 * @returns {() => void} Cleanup function that removes installed listeners.
 */
export function installChunkLoadRecovery({ win = window, maxReloads = DEFAULT_MAX_RELOADS } = {}) {
  if (!win || typeof win.addEventListener !== "function") {
    return () => {};
  }

  const storage = win.sessionStorage;
  const limit = Number.isFinite(maxReloads) && maxReloads >= 0 ? maxReloads : DEFAULT_MAX_RELOADS;

  const maybeRecover = (payload) => {
    if (!isLikelyChunkLoadFailure(payload)) return;

    const attempts = safeReadReloadCount(storage);
    if (attempts >= limit) return;

    safeWriteReloadCount(storage, attempts + 1);
    win.location?.reload?.();
  };

  const handleError = (event) => {
    const target = event?.target;
    maybeRecover({
      message: event?.message,
      filename: event?.filename,
      targetSrc: target && "src" in target ? target.src : "",
    });
  };

  const handleUnhandledRejection = (event) => {
    const reason = event?.reason;
    const message = reason instanceof Error ? reason.message : String(reason ?? "");
    maybeRecover({ message });
  };

  const handleLoad = () => {
    safeClearReloadCount(storage);
  };

  win.addEventListener("error", handleError, true);
  win.addEventListener("unhandledrejection", handleUnhandledRejection);
  win.addEventListener("load", handleLoad, { once: true });

  return () => {
    win.removeEventListener("error", handleError, true);
    win.removeEventListener("unhandledrejection", handleUnhandledRejection);
    win.removeEventListener("load", handleLoad);
  };
}
