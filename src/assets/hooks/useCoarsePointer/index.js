/**
 * @file useCoarsePointer.js
 * @description React hook for detecting coarse pointer environments (touch-first devices).
 * @module assets/hooks/useCoarsePointer
 */

import { useEffect, useState } from "react";

const COARSE_POINTER_QUERY = "(hover: none), (pointer: coarse)";

function getInitialIsCoarsePointer() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  try {
    return window.matchMedia(COARSE_POINTER_QUERY).matches;
  } catch {
    return false;
  }
}

/**
 * useCoarsePointer
 * ---------------------------------------------------------------------------
 * Detects whether the current device primarily uses coarse pointer input
 * (touch-centric interaction).
 *
 * @returns {boolean} True when pointer input is coarse.
 */
export default function useCoarsePointer() {
  const [isCoarsePointer, setIsCoarsePointer] = useState(getInitialIsCoarsePointer);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    let mediaQueryList;
    try {
      mediaQueryList = window.matchMedia(COARSE_POINTER_QUERY);
    } catch {
      return undefined;
    }

    const handlePointerChange = (event) => {
      setIsCoarsePointer(Boolean(event?.matches));
    };

    setIsCoarsePointer(mediaQueryList.matches);

    if (typeof mediaQueryList.addEventListener === "function") {
      mediaQueryList.addEventListener("change", handlePointerChange);
      return () => mediaQueryList.removeEventListener("change", handlePointerChange);
    }

    mediaQueryList.addListener(handlePointerChange);
    return () => mediaQueryList.removeListener(handlePointerChange);
  }, []);

  return isCoarsePointer;
}
