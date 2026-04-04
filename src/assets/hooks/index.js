/**
 * @file index.js
 * @description Barrel export for reusable hooks consumed across navigation, UI, and responsive flows.
 * @module assets/hooks/index
 */

import useBreakpoint from "./useBreakpoint";
import useClipboard from "./useClipboard";
import useCoarsePointer from "./useCoarsePointer";
import { useScrollSpyWithHistory, buildSectionTree } from "./useScrollSpy";

export { useBreakpoint, useClipboard, useCoarsePointer, useScrollSpyWithHistory, buildSectionTree };
