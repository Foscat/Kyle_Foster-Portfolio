# Responsive Navigation Containment Design

## Objective

Make every persistent navigation control occupy a predictable, non-overlapping region as the portfolio resizes and scrolls. Preserve the approved Arctic Indigo / Cyber Lime visual system while fixing the structural failures reproduced from the supplied Interface System screenshot.

## Confirmed Failure Modes

- The shared icon-button rule centers the mobile menu trigger instead of aligning it to the header edge.
- The route section command bar uses fixed breakpoint offsets that do not match the rendered primary-navigation height.
- At the 900px boundary, the desktop navigation wraps to a taller row while the section bar keeps the smaller offset.
- The back-to-top control uses the same top-right region as the primary and route navigation.
- Existing responsive checks cover width and overflow but do not inspect persistent-layer intersections after scrolling.

## Responsive Contract

### Primary navigation

- Mobile and compact-tablet layouts place the `KF` brand at the inline start and the menu trigger at the inline end.
- The desktop command bar appears only when its longest active label and utility controls fit on one row. The content-fit breakpoint is 940 CSS pixels.
- The rendered primary-navigation height is published as an app-level CSS custom property and refreshed whenever the visible navigation variant resizes.

### Route section navigation

- The “On this page” command bar remains sticky on every viewport.
- Its sticky offset is the measured primary-navigation height plus a consistent stack gap.
- Its surface is sufficiently opaque that scrolling content cannot create a visually merged text layer.
- It remains full-width within the route container and continues opening the existing right-side section drawer.

### Back-to-top control

- The back-to-top control moves to the bottom inline-end safe area.
- It remains keyboard accessible, touch-sized, and outside both sticky navigation tiers.
- Safe-area environment insets are respected on supported mobile devices.

## Quality Sweep

The shared contract must be exercised on CodeStream, Sanderson Technology Enterprises, Interface System, Side Projects, Hackathon, SMU, and Docs. Coverage includes:

- 390x844 phone portrait
- 844x390 phone landscape
- 768x1024 tablet portrait
- 899x650 and 900x650 around the original failure boundary
- 939x650 and 940x650 around the new content-fit boundary
- 1024x768 tablet landscape
- 1280x500 short desktop
- 1440x900 desktop

For each representative scroll state, persistent rectangles must not intersect, the mobile menu trigger must remain edge-aligned, horizontal overflow must remain at or below one pixel, and drawers must remain contained within the viewport. The Mermaid explorer must retain its existing full-screen mobile viewing behavior.

## Ownership and Compatibility

- `layout-style-css` continues to own general layout primitives.
- `ui-style-kit-css` continues to own palette and semantic surface tokens.
- `interactive-surface-css` continues to own interaction states.
- Portfolio CSS owns only the app-specific navigation stack, breakpoint, safe-area placement, and component integration.
- Routes, copy, metadata, diagram content, and public component APIs remain unchanged.
- The user-owned untracked `design-qa.md` is not modified or staged.

## Success Criteria

- The supplied collision cannot be reproduced at the equivalent landscape/tablet widths.
- Primary navigation, route navigation, and back-to-top never intersect after scrolling.
- The desktop command bar does not wrap at the breakpoint where it becomes visible.
- Mobile brand and menu controls occupy opposite edges of the header.
- Section drawers and the Mermaid explorer remain usable in both orientations.
- Focused regression checks, linting, formatting, the production build, and the repository’s final CI-equivalent test suite pass.
