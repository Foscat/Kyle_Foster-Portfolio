/**
 * @file index.jsx
 * @description Route-aware loader for the independently hosted visitor evidence logger.
 * @module components/features/VisitorEvidenceLogger
 */

import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Public client-script endpoint for the private evidence logger.
 *
 * @type {string}
 */
export const VISITOR_LOGGER_SCRIPT_URL =
  "https://private-visitor-evidence-logger.onrender.com/client/v1.js";

/**
 * @typedef {Object} VisitorEvidenceLoggerProps
 * @property {boolean} [enabled] - Overrides the production-only default for controlled tests.
 * @property {function((HTMLScriptElement|null)): void} [onScriptChange] - Optional lifecycle observer.
 */

/**
 * Load one privacy-noticed page-view beacon for the active client-side route.
 *
 * The remote client owns payload minimization and failure isolation. Replacing the
 * script after pathname changes records SPA navigation without collecting queries,
 * fragments, referrers, page contents, or form values.
 *
 * @param {VisitorEvidenceLoggerProps} props - Logger loader configuration.
 * @returns {null} This integration has no visible interface.
 */
export default function VisitorEvidenceLogger({ enabled = import.meta.env.PROD, onScriptChange }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!enabled || typeof document === "undefined") return undefined;

    const script = document.createElement("script");
    script.async = true;
    script.src = VISITOR_LOGGER_SCRIPT_URL;
    script.referrerPolicy = "no-referrer";
    script.dataset.visitorEvidenceLogger = "portfolio";
    script.dataset.site = "portfolio";
    script.dataset.browserId = "true";
    document.head.appendChild(script);
    onScriptChange?.(script);

    return () => {
      script.remove();
      onScriptChange?.(null);
    };
  }, [enabled, onScriptChange, pathname]);

  return null;
}
