/**
 * @file src\pages\Health\index.jsx
 * @description src\pages\Health\index module.
 * @module src\pages\Health\index
 */

import { version as reactVersion } from "react";
import Surface from "components/ui/Surface";

/**
 * @file index.jsx
 * @description Lightweight diagnostic component that displays basic
 * runtime and build environment information.
 * @module components/Health
 */

/**
 * Health
 * ---------------------------------------------------------------------------
 * Displays basic system and environment health information for the application.
 *
 * Intended usage:
 * - Developer diagnostics
 * - Build verification
 * - Quick runtime sanity checks during development or demos
 *
 * Displayed information:
 * - React version
 * - Current Vite environment mode
 * - Build tool identification
 * - Shared STE interface-library availability
 *
 * Notes:
 * - This component is informational only
 * - No side effects or external dependencies beyond environment variables
 *
 * @public
 * @component
 * @returns {JSX.Element} Rendered system health panel.
 */
const Health = () => {
  return (
    <Surface header="System Health">
      <ul>
        <li>React: {reactVersion}</li>
        <li>Environment: {import.meta.env.MODE}</li>
        <li>Build Tool: Vite</li>
        <li>STE Interface Libraries: Loaded</li>
      </ul>
    </Surface>
  );
};

export default Health;
