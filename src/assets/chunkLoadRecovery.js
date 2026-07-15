/**
 * @file chunkLoadRecovery.js
 * @description Detects recoverable JS chunk load failures (usually stale hashed assets after deploy)
 * and performs a single hard reload to recover without trapping users in a reload loop.
 * @module assets/chunkLoadRecovery
 */

const CHUNK_RELOAD_SESSION_KEY = "portfolio-chunk-reload-attempt";
const CHUNK_RECOVERY_QUERY_PARAM = "chunk-recover";
const DEFAULT_MAX_RELOADS = 2;

const DYNAMIC_IMPORT_FAILURE_PATTERNS = [
  /Failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /Importing a module script failed/i,
  /Loading chunk [\d]+ failed/i,
  /Unable to preload CSS for\s+\/assets\//i,
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
 * @param {string} [payload.targetHref] - Link href from `ErrorEvent.target`.
 * @param {boolean} [payload.isScriptLoadEvent=false] - True when the originating error event
 * is a script load failure event rather than a runtime exception.
 * @param {boolean} [payload.isStyleLoadEvent=false] - True when the originating error event
 * is a stylesheet load failure.
 * @returns {boolean} True when the payload indicates a likely deploy-time chunk mismatch.
 */
export function isLikelyChunkLoadFailure({
  message = "",
  filename = "",
  targetSrc = "",
  targetHref = "",
  isScriptLoadEvent = false,
  isStyleLoadEvent = false,
} = {}) {
  const combinedMessage = String(message || "").trim();
  const normalizedFilename = String(filename || "");
  const normalizedTargetSrc = String(targetSrc || "");
  const normalizedTargetHref = String(targetHref || "");

  if (DYNAMIC_IMPORT_FAILURE_PATTERNS.some((pattern) => pattern.test(combinedMessage))) {
    return true;
  }

  // Script element load failure for hashed Vite chunks.
  const scriptSource = normalizedTargetSrc || (isScriptLoadEvent ? normalizedFilename : "");
  if (/\/assets\/[^/]+\.js(?:\?.*)?$/i.test(scriptSource)) {
    return true;
  }

  const styleSource = normalizedTargetHref || (isStyleLoadEvent ? normalizedFilename : "");
  if (/\/assets\/[^/]+\.css(?:\?.*)?$/i.test(styleSource)) {
    return true;
  }

  // Some browsers only surface "Script error." with a filename for load failures.
  if (
    /^script error\.?$/i.test(combinedMessage) &&
    /\/assets\/[^/]+\.js(?:\?.*)?$/i.test(normalizedFilename)
  ) {
    return true;
  }

  return false;
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

const buildRecoveryUrl = (href, now) => {
  const url = new URL(href);
  url.searchParams.set(CHUNK_RECOVERY_QUERY_PARAM, String(now()));
  return url.toString();
};

const recoverNavigation = (win, now) => {
  const href = win?.location?.href;

  if (typeof href === "string" && typeof win?.location?.replace === "function") {
    try {
      win.location.replace(buildRecoveryUrl(href, now));
      return;
    } catch {
      // Fall through to hard reload.
    }
  }

  win?.location?.reload?.();
};

/**
 * @function tryRecoverFromChunkLoadFailure
 * @description Attempts one-time recovery for stale deploy asset failures.
 * Returns `true` when a reload was triggered.
 *
 * @param {Object} [options]
 * @param {Window} [options.win=window] - Window-like object used for navigation + storage.
 * @param {Object} [options.payload={}] - Error-like payload consumed by `isLikelyChunkLoadFailure`.
 * @param {number} [options.maxReloads=1] - Max automatic reload attempts per session.
 * @param {Function} [options.now=Date.now] - Timestamp source used for cache-busting URLs.
 * @returns {boolean} True when recovery navigation was attempted.
 */
export function tryRecoverFromChunkLoadFailure({
  win = window,
  payload = {},
  maxReloads = DEFAULT_MAX_RELOADS,
  now = Date.now,
} = {}) {
  if (!win || !isLikelyChunkLoadFailure(payload)) {
    return false;
  }

  const storage = win.sessionStorage;
  const limit = Number.isFinite(maxReloads) && maxReloads >= 0 ? maxReloads : DEFAULT_MAX_RELOADS;
  const nowFn = typeof now === "function" ? now : Date.now;
  const attempts = safeReadReloadCount(storage);

  if (attempts >= limit) {
    return false;
  }

  safeWriteReloadCount(storage, attempts + 1);
  recoverNavigation(win, nowFn);
  return true;
}

const clearRecoveryQueryParam = (win) => {
  const href = win?.location?.href;
  const replaceState = win?.history?.replaceState;

  if (typeof href !== "string" || typeof replaceState !== "function") return;

  try {
    const url = new URL(href);
    if (!url.searchParams.has(CHUNK_RECOVERY_QUERY_PARAM)) return;

    url.searchParams.delete(CHUNK_RECOVERY_QUERY_PARAM);
    const normalizedPath = `${url.pathname}${url.search}${url.hash}`;
    replaceState.call(win.history, win.history.state, "", normalizedPath);
  } catch {
    // Ignore URL parsing failures.
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
 * @param {Function} [options.now=Date.now] - Timestamp source used for cache-busting URLs.
 * @returns {Function} Cleanup function that removes installed listeners.
 */
export function installChunkLoadRecovery({
  win = window,
  maxReloads = DEFAULT_MAX_RELOADS,
  now = Date.now,
} = {}) {
  if (!win || typeof win.addEventListener !== "function") {
    return () => {};
  }

  const maybeRecover = (payload) => {
    tryRecoverFromChunkLoadFailure({
      win,
      payload,
      maxReloads,
      now,
    });
  };

  const handleError = (event) => {
    const target = event?.target;
    const hasScriptSrc =
      target && typeof target === "object" && "src" in target && typeof target.src === "string";
    const hasLinkHref =
      target && typeof target === "object" && "href" in target && typeof target.href === "string";
    const isScriptElement =
      typeof HTMLScriptElement !== "undefined" && target instanceof HTMLScriptElement;
    const isLinkElement =
      typeof HTMLLinkElement !== "undefined" && target instanceof HTMLLinkElement;
    const isScriptLoadEvent = isScriptElement || (hasScriptSrc && !event?.message);
    const isStyleLoadEvent = isLinkElement || (hasLinkHref && !event?.message);

    maybeRecover({
      message: event?.message,
      filename: event?.filename,
      targetSrc: hasScriptSrc ? target.src : "",
      targetHref: hasLinkHref ? target.href : "",
      isScriptLoadEvent,
      isStyleLoadEvent,
    });
  };

  const handleUnhandledRejection = (event) => {
    const reason = event?.reason;
    const message = reason instanceof Error ? reason.message : String(reason ?? "");
    maybeRecover({ message });
  };

  const handleLoad = () => {
    clearRecoveryQueryParam(win);
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
