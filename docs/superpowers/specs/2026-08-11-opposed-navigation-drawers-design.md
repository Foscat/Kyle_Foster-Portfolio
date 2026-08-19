# Opposed Navigation Drawers Design

**Date:** 2026-08-11

**Status:** Approved for implementation planning

**Scope:** Portfolio navigation only

## Goal

Keep website navigation and in-page section navigation behind distinct icon buttons at every viewport size. Website navigation opens from the left, while section navigation opens from the right.

The persistent header should remain visually quiet and predictable instead of changing between text-led desktop navigation and drawer-led compact navigation.

## Current Problem

The current unified header still changes its information architecture at the 940px content-fit breakpoint. Desktop widths expose website links, utilities, an active-section label, and section progress, while compact widths expose a website drawer trigger and shorten the section control.

This breakpoint-dependent structure leaves the header crowded and makes the two navigation systems feel inconsistent. It also conflicts with the requested rule that navigation choices remain behind icons.

## Product Decision

Use one full-width sticky header with three stable positions:

1. An icon button at the left opens website navigation in a left-side drawer.
2. The `KF` home link stays visually centered.
3. An icon button at the right opens route-section navigation in a right-side drawer when the route has registered sections.

Routes without section navigation omit the right button while retaining an equal-width layout track so the brand remains centered.

This direction is preferred over floating edge buttons, which would add persistent layers over page content, and over retaining desktop route links, which would violate the always-drawer requirement.

## Component Architecture

### Unified navigation

`UnifiedNavigation` remains the page-level public component and continues to accept the active route, canonical page URL, and optional route sections. It owns the full-width sticky surface, the website navigation trigger and drawer, the centered home link, and the optional section navigation coordinator.

The visible desktop route list and desktop utility group are removed from the persistent header. Website destinations, resume access, color controls, and accessibility controls remain available in the left drawer at every width.

### Website navigation drawer

The website navigation drawer:

- always uses `placement="left"`;
- opens from the left header icon;
- preserves active-route styling and `aria-current="page"`;
- preserves client-side route transitions and closes after selection;
- preserves the existing `Ctrl+Shift+M` shortcut;
- contains the resume, color, and accessibility controls;
- closes through its close button, backdrop, or Escape behavior.

The trigger uses an icon-only visual treatment with a minimum 44-by-44-pixel target and the accessible name `Open website navigation`.

### Section navigation drawer

`StickySectionNav` continues to own scroll-spy and anchor coordination. `MobileSectionNavTrigger` becomes a viewport-independent section drawer trigger rather than a mobile-only command bar.

The section navigation drawer:

- always uses `placement="right"`;
- appears only when the route supplies navigable sections;
- opens from the right header icon;
- preserves the current section tree, nested subsection expansion, active location, history updates, and measured anchor offset;
- closes after a section or subsection is selected;
- closes through its close button, backdrop, or Escape behavior.

The trigger displays only the section-list icon. Its accessible name continues to expose the current section, such as `Open section navigation: Architecture`, without rendering that label or progress text in the header.

## Visual and Responsive Contract

The header keeps one stable row at all supported sizes. It has no desktop-only route list, visible current-section label, section progress counter, or breakpoint-driven navigation mode.

The row uses three equal layout tracks so the brand remains centered independently of the available section trigger. The left and right icon buttons align to their respective edges inside the normal page gutter. On routes without sections, the unused right track remains visually empty and does not create an interactive element.

The existing semantic theme tokens, focus treatment, near-opaque header surface, full-width breakout, safe-area insets, and custom-library ownership remain unchanged.

Representative viewport coverage remains:

- 320x568 narrow phone portrait
- 390x844 phone portrait
- 844x390 phone landscape
- 900x650 compact tablet
- 940x650 former content-fit boundary
- 1024x768 tablet landscape
- 1280x500 short desktop
- 1440x900 desktop

At every state, the header must stay within the viewport, avoid horizontal overflow, remain one row tall, keep both icon targets usable, and avoid obscuring focused route content.

## Accessibility and Interaction

- Preserve separate `Primary navigation` and `On this page` landmarks inside their respective drawers.
- Preserve visible focus treatment, keyboard navigation, active-route and active-section semantics, touch target sizes, drawer titles, and accessible close buttons.
- Keep icon-only controls understandable through stable accessible names.
- Keep the centered brand as a labeled home link.
- Opening or closing a drawer must not reload the page or change the current route unexpectedly.
- Drawer selection must return the user to the selected route or section with the drawer closed.

## Verification Strategy

Focused component regressions will verify:

- icon-only website navigation at all viewport-independent render states;
- left placement for the website drawer and right placement for the section drawer;
- centered home-link structure with and without route sections;
- the absence of visible desktop route links, section labels, and progress text;
- preserved active state, client-side navigation, utility controls, keyboard shortcuts, Escape handling, and drawer closure;
- preserved section selection, subsection expansion, hash updates, and accessible current-section naming.

Rendered browser verification will cover the responsive matrix, both drawer directions, focus behavior, route and anchor selection, header containment, and horizontal overflow. Focused linting and formatting run before the final repository verification gate; the broad CI-equivalent commands run only after the implementation is complete.

## Non-Goals

- Combining website and section navigation into one drawer
- Changing route names, route paths, section labels, or anchor IDs
- Redesigning page content, typography, colors, or theme palettes
- Moving navigation state into a new global store
- Changing SEO metadata, Mermaid behavior, the footer, or deployment configuration
