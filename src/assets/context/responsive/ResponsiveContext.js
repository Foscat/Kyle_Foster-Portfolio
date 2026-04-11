/**
 * @module src\assets\context\responsive\ResponsiveContext
 * @file ResponsiveContext.js
 * @description Provides a React context for responsive design, allowing components to access viewport size and device type information.
 */

import { createContext, useContext } from "react";

export const ResponsiveContext = createContext(null);

//
export function useResponsive() {
  const ctx = useContext(ResponsiveContext);
  if (!ctx) {
    throw new Error("useResponsive must be used within ResponsiveProvider");
  }
  return ctx;
}
