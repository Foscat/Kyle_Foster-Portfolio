# Responsive Navigation Containment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every persistent portfolio control a measured, non-overlapping layout region across scroll, resize, orientation, and breakpoint changes.

**Architecture:** Keep the existing primary navigation, route command bar, drawer, and back-to-top components. Publish the visible primary-navigation height through one app-level CSS variable, consume it as the route command bar’s sticky offset, switch the desktop command bar at its measured content-fit width, and reserve the bottom safe area for back-to-top.

**Tech Stack:** React 19, Vite, CSS custom properties, ResizeObserver, RSuite, Playwright, Vitest, ESLint, Stylelint, Prettier

## Global Constraints

- Preserve the approved Arctic Indigo / Cyber Lime visual language and current routes, copy, SEO metadata, diagrams, and public APIs.
- Keep “On this page” sticky on every viewport.
- Use 940 CSS pixels as the desktop-navigation content-fit breakpoint.
- Keep custom-library ownership intact; portfolio styles may only own app-specific integration.
- Do not modify or stage the user-owned untracked `design-qa.md`.
- Use regression-first development and run the full CI-equivalent suite only at the final gate.

---

## File Responsibilities

- `playwright/route-sidebar-responsive.spec.ts`: Browser-level rectangle, breakpoint, scroll-state, and overflow contracts for sectioned routes.
- `src/components/navigation/StickyNav/index.jsx`: Measure the visible primary-navigation variant and publish its height.
- `src/components/navigation/StickyNav/styles.css`: Own the 940px visibility breakpoint and mobile edge alignment.
- `src/App.css`: Define the safe fallback navigation height and consume the measured height for the route command bar offset.
- `src/components/navigation/MobileSectionNavTrigger/styles.css`: Keep the sticky command bar visually distinct from scrolling content.
- `src/components/navigation/BackToTopButton/styles.css`: Reserve the bottom safe area for the floating action.
- `docs/superpowers/specs/2026-08-10-responsive-navigation-containment-design.md`: Record the approved design and acceptance criteria.

### Task 1: Add the persistent-layer regression contract

**Files:**
- Modify: `playwright/route-sidebar-responsive.spec.ts`

**Interfaces:**
- Consumes: `.desktop-menu`, `.mobile-site-header`, `.page-sidebar`, `.route-section-nav`, `.back-to-top`, and the mobile navigation trigger.
- Produces: behavior-focused intersection, alignment, opacity, breakpoint, and overflow assertions.

- [ ] Add a rectangle intersection helper and a `getPersistentLayerMeasurement(page)` browser measurement that returns visible primary navigation, section navigation, back-to-top, mobile trigger alignment, route-bar background alpha, and horizontal overflow.
- [ ] Add a focused Interface System test covering 390, 844, 899, 900, 939, 940, 1024, and 1280 CSS pixel widths after an instant scroll.
- [ ] Add a shared-route test covering all seven sectioned routes at phone landscape, the compact breakpoint boundary, and desktop.
- [ ] Assert that widths below 940 use the mobile header, widths at or above 940 use the desktop command bar, and the primary command bar remains one row when visible.
- [ ] Run `npx.cmd playwright test playwright/route-sidebar-responsive.spec.ts -g "persistent navigation layers" --workers=2` and confirm it fails because the current sticky layers intersect.

### Task 2: Publish the rendered primary-navigation height

**Files:**
- Modify: `src/components/navigation/StickyNav/index.jsx`
- Modify: `src/components/navigation/StickyNav/styles.css`
- Modify: `src/App.css`

**Interfaces:**
- Produces: `--portfolio-primary-nav-height` on `document.documentElement`.
- Consumes: `--portfolio-primary-nav-height` in `.page-sidebar`.

- [ ] Add one layout effect that selects both primary-navigation variants, measures the visible variant, rounds its rendered height up, and publishes the value in pixels.
- [ ] Observe both variants with `ResizeObserver` when available and retain a window-resize fallback; disconnect and remove listeners on unmount without clearing the last valid height.
- [ ] Change the desktop/mobile navigation visibility boundary from 900px to 940px.
- [ ] Give `.page-sidebar` a sticky top of `calc(var(--portfolio-primary-nav-height) + var(--portfolio-nav-stack-gap))` with safe fallback values.
- [ ] Add concise professional comments explaining the measured-height contract and why the app owns it.

### Task 3: Place every control in its assigned region

**Files:**
- Modify: `src/components/navigation/StickyNav/styles.css`
- Modify: `src/components/navigation/MobileSectionNavTrigger/styles.css`
- Modify: `src/components/navigation/BackToTopButton/styles.css`

**Interfaces:**
- Consumes: existing semantic UI-kit surfaces and interaction classes.
- Produces: edge-aligned mobile controls, an opaque sticky command surface, and bottom-safe-area back-to-top placement.

- [ ] Override the shared icon-only auto margin at component scope so the mobile menu trigger aligns to the inline end.
- [ ] Preserve the command bar’s semantic surface color while increasing its opacity enough to prevent text bleed-through.
- [ ] Replace the back-to-top `top` anchor with `bottom: max(...)` using `env(safe-area-inset-bottom)` and retain existing touch target sizes.
- [ ] Run the focused persistent-layer Playwright test and confirm all new assertions pass.
- [ ] Run the existing mobile menu and Interface System route specs to protect drawer interactions and route content.

### Task 4: Perform rendered responsive QA

**Files:**
- No production files expected unless the rendered evidence exposes another in-scope containment defect.

- [ ] Reload the existing Chrome audit tab and verify page identity, meaningful content, and absence of a framework error overlay.
- [ ] Capture Interface System after-state screenshots at 844x390, 900x650, 940x650, and 1280x500 after scrolling.
- [ ] Exercise the primary drawer, section drawer, back-to-top interaction, and Mermaid full-screen explorer in phone portrait and landscape.
- [ ] Inspect console warnings/errors and classify every relevant entry.
- [ ] Compare the supplied screenshot and the fixed screenshot together and record any intentional visual deviation.

### Task 5: Run final quality gates and update the existing PR

**Files:**
- Review all changed files; do not stage `design-qa.md`.

- [ ] Run focused ESLint, Stylelint, and Prettier checks on the changed source and test files.
- [ ] Run `npm.cmd run lint:all`.
- [ ] Run `npm.cmd run test` once as the final CI-equivalent test gate.
- [ ] Run `npm.cmd run build`, `npm.cmd run quality:bundle-budgets`, `npm.cmd run seo:check`, and `git diff --check`.
- [ ] Audit every design success criterion against fresh browser or command evidence.
- [ ] Create a professional conventional commit containing only the intended responsive-containment files, push `feat/portfolio-app-remodel`, and update the existing pull request without deploying the site.
