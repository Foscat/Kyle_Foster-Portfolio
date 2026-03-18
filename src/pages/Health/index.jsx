import { Panel } from "rsuite";

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
 * - RSuite availability
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
    <Panel bordered header="System Health">
      <ul>
        <li>React: 18.2.0</li>
        <li>Environment: {import.meta.env.MODE}</li>
        <li>Build Tool: Vite</li>
        <li>RSuite: Loaded</li>
      </ul>
    </Panel>
  );
};

export default Health;
