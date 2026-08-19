/**
 * @file index.jsx
 * @description Compatibility entry point for the unified site navigation.
 * @module components/navigation/StickyNav
 */

import UnifiedNavigation from "../UnifiedNavigation";

/**
 * Preserve the former import boundary while route modules migrate to the
 * unified page-level navigation component.
 *
 * @param {object} props - Unified navigation properties.
 * @returns {JSX.Element} Unified page navigation.
 */
const StickyNav = (props) => <UnifiedNavigation {...props} />;

export default StickyNav;
