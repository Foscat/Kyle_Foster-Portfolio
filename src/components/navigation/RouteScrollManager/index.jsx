/**
 * @file index.jsx
 * @description Restores the document start after client-side pathname navigation.
 * @module components/navigation/RouteScrollManager
 */

import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Keeps routed pages from inheriting the scroll position of the previous page.
 * Hash destinations are left to the browser so deep links retain native behavior.
 *
 * @returns {null} This behavior-only component does not render UI.
 */
export default function RouteScrollManager() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) return;

    window.scrollTo({
      behavior: "auto",
      left: 0,
      top: 0,
    });
  }, [hash, pathname]);

  return null;
}
