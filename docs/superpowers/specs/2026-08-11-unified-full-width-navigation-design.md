# Unified Full-Width Navigation Design

**Date:** 2026-08-11

**Status:** Approved for implementation planning

**Scope:** Portfolio navigation only

## Goal

Replace the visually separate primary and route-section bars with one full-width sticky navigation surface. The surface must touch the viewport's top, left, and right edges while its controls retain the portfolio's normal readable gutter.

The result should read as one intentional application header, not two floating panels stacked above the page.

## Current Problem

The primary navigation and the "On this page" control are composed in different parts of each route. They therefore create separate sticky surfaces with independent widths, borders, corner radii, and offsets. Because both surfaces inherit the page wrapper's maximum width, their backgrounds stop at the content boundary instead of defining the screen edge.

This separation also makes responsive behavior harder to reason about: the primary navigation, section navigation, and content layout each own part of the vertical stack.

## Product Decision

Use one page-level `UnifiedNavigation` component that composes the existing primary and section-navigation behaviors inside a single full-bleed shell.

This is preferred over:

- visually joining the existing bars with CSS, which would retain two independent sticky layers;
- moving all route navigation into a global app registry, which would introduce more application-level state than this focused correction requires.

The approved direction keeps the section control visible inside the unified bar rather than hiding it in the primary hamburger drawer.

## Visual Structure

### Full-width surface

- One sticky header spans the dynamic viewport width and sits flush against the top edge.
- The outer surface has no floating-card corner radius or side margin.
- A single bottom border, restrained shadow, and existing semantic surface tokens separate navigation from page content.
- An inner row uses the existing page gutter and maximum content width so controls stay aligned with the portfolio below it.
- The Arctic Indigo / Cyber Lime identity, typography, focus treatment, and custom-library ownership remain unchanged.

### Desktop layout

The row order is:

1. `KF` home link
2. primary route links
3. compact "On this page" control when the current route has registered sections
4. resume, color, and accessibility utilities

The section control displays the active section without becoming a second row or separate panel. Routes without section navigation omit the control and allow the utility group to retain its existing alignment.

### Mobile and compact layout

The row order is:

1. `KF` home link
2. compact section control when available
3. primary hamburger trigger

The section control displays the current section when space permits. On narrow phones it shortens visually to "Sections" while its accessible name continues to identify the current section. The primary and section drawers remain separate because they answer different navigation questions, but both are launched from the same visible header surface.

The row must remain a single line at supported text scaling. Labels may truncate gracefully; controls may not overlap, float away from the row, or create horizontal page scrolling.

## Component Architecture

### `UnifiedNavigation`

The new page-level component accepts:

- the active route;
- an optional canonical page URL;
- an optional section definition array.

It owns the full-bleed sticky shell and composes the current primary-navigation and scroll-spy behaviors. Pages use this component once instead of rendering `StickyNav` near the top and `StickySectionNav` in a later sidebar slot.

### Primary navigation

Existing route data, active-state logic, keyboard shortcut, primary drawer, resume access, color settings, and accessibility settings remain intact. The mobile header becomes an internal row variant rather than a second independent sticky surface.

### Section navigation

Existing section-tree construction, history updates, scroll-spy state, section progress, nested-section expansion, and section drawer behavior remain intact. Only the trigger's placement and compact presentation change.

The section trigger remains a dedicated `nav` landmark labeled "On this page" within the shared header. This preserves semantic distinction without creating a second visual bar.

### Route layout

The seven sectioned routes remove the obsolete navigation sidebar wrapper. Their main content remains in the current order and keeps its existing width, copy, metadata, diagrams, and anchors. Non-section routes use the same unified header without section props.

## State and Interaction Flow

1. The route renders `UnifiedNavigation` with its active page and optional sections.
2. Primary navigation marks the active route as it does today.
3. Section navigation observes the page's registered anchors and updates the compact label and progress state.
4. Activating the section control opens the existing section drawer.
5. Selecting a section updates the hash, scrolls with the measured unified-header offset, closes the drawer, and restores focus predictably.
6. Route changes close any open navigation drawer and reset section state through normal component lifecycle behavior.

If a route has no sections, the section control is absent. If an expected anchor is missing, navigation must fail safely without throwing or moving focus to an invalid target.

## Responsive Contract

The design must remain usable at these representative states:

- 320x568 narrow phone portrait
- 390x844 phone portrait
- 844x390 phone landscape
- 900x650 compact tablet
- 939x650 final compact width
- 940x650 desktop content-fit boundary
- 1024x768 tablet landscape
- 1280x500 short desktop
- 1440x900 desktop

At every state:

- exactly one visible sticky header surface spans the viewport;
- the surface's left and right edges align with the viewport within one CSS pixel;
- primary and section controls remain inside that surface;
- the visible row does not wrap into a second navigation slab;
- drawers remain within the viewport and close cleanly;
- page horizontal overflow remains at or below one CSS pixel;
- the header does not obscure the focused section target;
- the back-to-top control retains its bottom safe-area placement.

## Accessibility and SEO

- Preserve the primary and "On this page" landmark labels.
- Preserve `aria-current`, focus-visible treatment, touch target sizes, drawer titles, Escape behavior, and keyboard navigation.
- The compact visual label must not reduce the accessible name.
- Maintain sufficient contrast and near-opaque navigation paint across every supported palette and UI style.
- Do not change route paths, headings, canonical metadata, structured data, sitemap behavior, or crawler-facing content.

## Verification Strategy

Implementation begins with browser regressions that fail against the current two-surface layout. The tests will assert one full-width header, embedded section controls, non-overlap, single-line containment, drawer behavior, anchor offset, and absence of horizontal overflow across the responsive matrix.

Focused component tests will protect:

- routes with and without section definitions;
- compact accessible labeling;
- primary and section drawer independence;
- active route and active section state;
- cleanup after route changes and drawer closure.

Rendered QA will compare the supplied screenshot with the implementation at the same viewport, then inspect phone portrait, phone landscape, compact tablet, breakpoint, short desktop, and wide desktop states. Console output must contain no app-owned errors or warnings.

The final gate includes focused lint and formatting, the relevant unit and browser tests, the full repository test suite, production build, bundle budgets, route-test mapping, static SEO validation, and diff integrity.

## Non-Goals

- Redesigning page content, typography, colors, or information architecture
- Combining the primary and section drawers into one drawer
- Changing section labels or route names
- Moving navigation to a new global state registry
- Altering Mermaid, footer, SEO, or deployment behavior
