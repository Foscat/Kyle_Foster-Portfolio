/** ResponsiveContext.js
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
