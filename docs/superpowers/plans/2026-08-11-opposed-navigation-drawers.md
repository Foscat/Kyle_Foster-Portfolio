# Opposed Navigation Drawers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep website navigation behind a left-side icon drawer and route-section navigation behind a right-side icon drawer at every viewport size.

**Architecture:** Simplify `UnifiedNavigation` to a stable three-track sticky header containing a left website-navigation trigger, centered `KF` home link, and optional right section-navigation trigger. Preserve the existing drawer contents, route state, scroll-spy integration, accessibility utilities, and full-width shell while removing visible desktop route links, section labels, progress text, and breakpoint-dependent navigation modes.

**Tech Stack:** React 19, React Router, RSuite `Drawer`/`Nav`, Font Awesome, Vitest, Testing Library, Playwright, CSS, ESLint, Stylelint, Prettier

## Global Constraints

- Website navigation must always open from `placement="left"`.
- Route-section navigation must always open from `placement="right"`.
- Both visible triggers must be icon-only with at least 44-by-44-pixel targets and stable accessible names.
- The `KF` home link must remain visually centered with and without route sections.
- Preserve routes, labels, active states, section anchors, scroll-spy behavior, hash updates, utilities, theme tokens, focus treatment, and SEO behavior.
- Preserve the library boundary: Layout Style CSS owns structure, UI Style Kit CSS owns paint, Interactive Surface CSS owns interaction states, and Icons owns semantic iconography.
- Keep code comments concise, professional, and focused on non-obvious behavior.
- Preserve the untracked `design-qa.md` and all unrelated working-tree changes.
- Do not commit, push, publish, deploy, or change remote state without explicit authorization.
- Run only focused checks while implementing. Run the broad CI-equivalent verification once, at the final gate.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `src/components/navigation/UnifiedNavigation/index.jsx` | Stable header composition, website drawer state, route links, utilities, and keyboard behavior. |
| `src/components/navigation/UnifiedNavigation/styles.css` | Full-width three-track header geometry plus website-drawer presentation. |
| `src/components/navigation/MobileSectionNavTrigger/index.jsx` | Icon-only section trigger and right-side section drawer. |
| `src/components/navigation/MobileSectionNavTrigger/styles.css` | Section trigger geometry and section-drawer presentation. |
| `src/components/navigation/__tests__/StickyNav.test.jsx` | Header, website drawer, routes, utilities, placement, and keyboard contracts. |
| `src/components/navigation/__tests__/StickySectionNav.test.jsx` | Section trigger, right drawer, current-section accessibility, and anchor behavior. |
| `src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx` | Section tree, close behavior, nested items, and icon-only trigger contracts. |
| `playwright/route-sidebar-responsive.spec.ts` | Header alignment, centering, drawer direction, overflow, and responsive matrix. |
| `playwright/mobile-menu-stability.spec.ts` | Website drawer route/utility stability on compact viewports. |
| `docs/navigation.md` | Public navigation behavior and keyboard-access documentation. |

---

### Task 1: Lock the viewport-independent drawer contract in component tests

**Files:**

- Modify: `src/components/navigation/__tests__/StickyNav.test.jsx`
- Modify: `src/components/navigation/__tests__/StickySectionNav.test.jsx`
- Modify: `src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx`

**Interfaces:**

- Consumes: `StickyNav({ activePage, pageUrl?, sections? })` and `StickySectionNav({ pageUrl, sections })`.
- Produces: Regression contracts for the visible header controls, accessible names, drawer landmarks, and left/right placement classes.

- [ ] **Step 1: Replace desktop-navigation expectations with the stable header contract**

Add a `StickyNav` test that renders a sectioned route and asserts one website trigger, one centered home link, one section trigger, and no exposed destination links while the drawer is closed:

```jsx
it("keeps both navigation systems behind opposed icon triggers", () => {
  renderWithProviders(
    <StickyNav
      activePage={PageRoute.INTERFACE_SYSTEM}
      pageUrl={PageRoute.INTERFACE_SYSTEM}
      sections={sections}
    />
  );

  const shell = screen.getByTestId("unified-navigation");
  expect(within(shell).getByRole("button", { name: "Open website navigation" })).toBeVisible();
  expect(
    within(shell).getByRole("button", { name: "Open section navigation: System overview" })
  ).toBeVisible();
  expect(within(shell).getByRole("link", { name: "Kyle Foster home" })).toHaveAttribute(
    "href",
    PageRoute.HOME
  );
  expect(within(shell).queryByRole("link", { name: "Work" })).not.toBeInTheDocument();
  expect(within(shell).queryByText("1 / 2")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Assert the website drawer placement and landmark**

Open the website drawer and require its left placement, primary landmark, routes, and utilities:

```jsx
await user.click(screen.getByRole("button", { name: "Open website navigation" }));
const dialog = await screen.findByRole("dialog", { name: "Website Navigation" });
expect(dialog.closest(".rs-drawer")).toHaveClass("rs-drawer-left");
expect(within(dialog).getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
expect(within(dialog).getByRole("link", { name: "Work" })).toHaveAttribute(
  "href",
  PageRoute.SIDE_PROJECTS
);
expect(within(dialog).getByRole("button", { name: /open color settings/i })).toBeVisible();
```

- [ ] **Step 3: Replace visible section-label assertions with accessible-name assertions**

Update `StickySectionNav.test.jsx` to require an icon-only header trigger and verify the current section remains available to assistive technology:

```jsx
const trigger = screen.getByRole("button", {
  name: "Open section navigation: Architecture",
});
expect(trigger).toBeVisible();
expect(trigger).not.toHaveTextContent("Architecture");
expect(screen.queryByText("2 / 2")).not.toBeInTheDocument();
```

- [ ] **Step 4: Assert the section drawer placement and landmark**

Open the section drawer and verify that its navigable tree is inside a right-side `On this page` landmark:

```jsx
await user.click(trigger);
const dialog = await screen.findByRole("dialog", { name: /page page/i });
expect(dialog.closest(".rs-drawer")).toHaveClass("rs-drawer-right");
expect(within(dialog).getByRole("navigation", { name: "On this page" })).toBeVisible();
```

- [ ] **Step 5: Run only the navigation component tests and confirm the intended failures**

Run:

```powershell
npm.cmd exec vitest run -- src/components/navigation/__tests__/StickyNav.test.jsx src/components/navigation/__tests__/StickySectionNav.test.jsx src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx --maxWorkers=2
```

Expected: FAIL because desktop destinations and section labels remain visible, the website trigger uses the old name, and the drawer landmarks are not yet in their approved locations.

- [ ] **Step 6: Review the test diff without committing**

Run:

```powershell
git diff --check -- src/components/navigation/__tests__
git diff -- src/components/navigation/__tests__
```

Expected: no whitespace errors; only the approved navigation contracts change.

---

### Task 2: Implement the stable left-drawer website navigation header

**Files:**

- Modify: `src/components/navigation/UnifiedNavigation/index.jsx`
- Modify: `src/components/navigation/UnifiedNavigation/styles.css`
- Test: `src/components/navigation/__tests__/StickyNav.test.jsx`

**Interfaces:**

- Consumes: `NAV_ITEMS`, `PageRoute`, theme/resume data, and optional `sections` already supplied by each route.
- Produces: `UnifiedNavigation({ activePage, pageUrl = activePage, sections = [] })` with `.unified-navigation__site-trigger`, `.unified-navigation__brand`, and `.unified-navigation__sections` grid areas.

- [ ] **Step 1: Rename website drawer state and handlers for viewport-independent behavior**

Replace `mobileOpen`/`setMobileOpen`/`closeMobileNav` with `siteNavigationOpen`/`setSiteNavigationOpen`/`closeSiteNavigation`. Preserve Escape and `Ctrl+Shift+M`, but update comments and accessible names to describe website navigation rather than a mobile-only menu.

Add the stable open handler next to the close callback:

```jsx
const openSiteNavigation = useCallback((event) => {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  setSiteNavigationOpen(true);
}, []);
```

- [ ] **Step 2: Replace the breakpoint-specific header markup with three stable tracks**

Render the header controls in this order:

```jsx
<div className="unified-navigation__inner">
  <div className="unified-navigation__site-trigger">
    <Btn
      icon={faBars}
      variant={Variant.ACCENT}
      size={Size.LG}
      noBG
      ariaLabel="Open website navigation"
      ariaExpanded={siteNavigationOpen}
      onClick={openSiteNavigation}
    />
  </div>
  <Link
    className="sticky-nav-brand unified-navigation__brand"
    to={PageRoute.HOME}
    aria-label="Kyle Foster home"
  >
    KF
  </Link>
  {hasSections ? (
    <div className="unified-navigation__sections">
      <StickySectionNav pageUrl={pageUrl} sections={sections} />
    </div>
  ) : (
    <span className="unified-navigation__section-spacer" aria-hidden="true" />
  )}
</div>
```

Use a named `openSiteNavigation` callback that prevents the triggering click from navigating or bubbling before setting the drawer state.

- [ ] **Step 3: Keep all destinations and utilities inside the left drawer**

Keep the existing data-driven route map and utility controls, change the title and close-control name to `Website Navigation`, and give the existing vertical `Nav` an explicit landmark:

```diff
- <Drawer.Title>Site Navigation</Drawer.Title>
+ <Drawer.Title>Website Navigation</Drawer.Title>
- ariaLabel="Close site navigation"
+ ariaLabel="Close website navigation"
- <Nav vertical>
+ <Nav vertical role="navigation" aria-label="Primary navigation">
```

Do not change the existing inline destination map or utility children except where their surrounding drawer contract requires it.

- [ ] **Step 4: Replace the unified-header CSS with viewport-independent geometry**

Remove the `940px` desktop/compact navigation switch from the unified block and use stable grid areas:

```css
.unified-navigation__inner {
  display: grid;
  grid-template-columns: minmax(2.75rem, 1fr) auto minmax(2.75rem, 1fr);
  grid-template-areas: "site brand sections";
  align-items: center;
  width: min(
    var(--page-max-width),
    calc(100% - var(--unified-navigation-breakout-start) - var(--unified-navigation-breakout-end))
  );
  min-width: 0;
  min-height: 4rem;
  margin-inline: auto;
}

.unified-navigation__site-trigger {
  grid-area: site;
  justify-self: start;
}

.unified-navigation__brand {
  grid-area: brand;
  justify-self: center;
}

.unified-navigation__sections,
.unified-navigation__section-spacer {
  grid-area: sections;
  justify-self: end;
}

.unified-navigation__site-trigger .btn.icon-only,
.unified-navigation__sections .btn.icon-only {
  width: 2.75rem;
  min-width: 2.75rem;
  height: 2.75rem;
}
```

Preserve the full-width breakout, near-opaque semantic surface, safe-area behavior, shadow, and measured `--portfolio-primary-nav-height` publishing.

- [ ] **Step 5: Run the focused website-navigation test file**

Run:

```powershell
npm.cmd exec vitest run -- src/components/navigation/__tests__/StickyNav.test.jsx --maxWorkers=2
```

Expected: PASS with one icon-triggered left drawer and no exposed desktop destinations.

- [ ] **Step 6: Review the implementation slice without committing**

Run:

```powershell
git diff --check -- src/components/navigation/UnifiedNavigation src/components/navigation/__tests__/StickyNav.test.jsx
git diff --stat
```

Expected: no whitespace errors and no route, metadata, content, or dependency changes.

---

### Task 3: Make section navigation icon-only and right-drawer-only at every width

**Files:**

- Modify: `src/components/navigation/MobileSectionNavTrigger/index.jsx`
- Modify: `src/components/navigation/MobileSectionNavTrigger/styles.css`
- Test: `src/components/navigation/__tests__/StickySectionNav.test.jsx`
- Test: `src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx`

**Interfaces:**

- Consumes: `title`, `sections`, `activeLeafId`, `activeChain`, `isExpanded`, `onToggleSection`, and `navigate` from `StickySectionNav`.
- Produces: An icon-only `.section-nav-trigger` and right-side drawer containing `<nav aria-label="On this page">`.

- [ ] **Step 1: Remove visible section label and progress output from the trigger**

Keep current-section calculation only for the accessible name. Replace the command bar with an icon-only control:

```jsx
const openSectionNavigation = useCallback((event) => {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  setOpen(true);
}, []);

<div className="route-section-nav">
  <Btn
    icon={faListUl}
    size={Size.LG}
    noBG
    onClick={openSectionNavigation}
    className="section-nav-trigger route-section-nav__trigger"
    ariaLabel={`Open section navigation: ${currentSectionLabel}`}
    ariaExpanded={open}
    variant={Variant.ACCENT}
  />
</div>
```

Use a named `openSectionNavigation` handler with the same prevent-default and stop-propagation behavior as the current inline callback.

- [ ] **Step 2: Move the section landmark into the right drawer**

Keep `placement="right"` and change the existing section-list wrapper into the drawer landmark without changing its mapped children. Replace its opening tag:

```diff
- <div className="mobile-section-list">
+ <nav className="mobile-section-list" aria-label="On this page">
```

Replace the corresponding closing `</div>` immediately after the `navigableSections.map` expression with `</nav>`. Preserve the existing inline group JSX, section selection, subsection expansion, close-after-selection, Escape handling, and accessible close control.

- [ ] **Step 3: Simplify section-trigger CSS to one icon target**

Replace the command-bar grid, label, progress, truncation, and compact-phone rules with:

```css
.route-section-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.section-nav-trigger.route-section-nav__trigger {
  display: grid;
  place-items: center;
  width: 2.75rem;
  min-width: 2.75rem;
  height: 2.75rem;
  margin: 0;
  padding: 0.55rem;
  cursor: pointer;
}
```

Preserve the existing drawer list, active item, nested subsection, close-button, small-screen width, and semantic color rules.

- [ ] **Step 4: Run the focused section-navigation tests**

Run:

```powershell
npm.cmd exec vitest run -- src/components/navigation/__tests__/StickySectionNav.test.jsx src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx --maxWorkers=2
```

Expected: PASS with no visible section label or progress and with the drawer tree inside a right-side landmark.

- [ ] **Step 5: Re-run all three navigation component files**

Run:

```powershell
npm.cmd exec vitest run -- src/components/navigation/__tests__/StickyNav.test.jsx src/components/navigation/__tests__/StickySectionNav.test.jsx src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx --maxWorkers=2
```

Expected: PASS with no cross-component regressions.

- [ ] **Step 6: Review the implementation slice without committing**

Run:

```powershell
git diff --check -- src/components/navigation
git diff -- src/components/navigation/MobileSectionNavTrigger src/components/navigation/__tests__/StickySectionNav.test.jsx src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx
```

Expected: no whitespace errors; scroll-spy and anchor-navigation logic remain unchanged.

---

### Task 4: Update rendered regressions, documentation, and the final verification gate

**Files:**

- Modify: `playwright/route-sidebar-responsive.spec.ts`
- Modify: `playwright/mobile-menu-stability.spec.ts`
- Modify: `docs/navigation.md`
- Modify: `docs/superpowers/plans/2026-08-11-opposed-navigation-drawers.md`

**Interfaces:**

- Consumes: `.unified-navigation__site-trigger`, `.unified-navigation__brand`, `.unified-navigation__sections`, `.mobile-nav-drawer`, and `.mobile-section-nav-drawer`.
- Produces: Browser evidence across the approved viewport matrix and accurate navigation documentation.

- [ ] **Step 1: Replace breakpoint expectations with stable icon-header measurements**

Update the Playwright measurement helper to return the header, website trigger, brand, optional section trigger, and overflow. At every approved viewport, assert:

```ts
expect(measurement.websiteTrigger, `${label}: website trigger`).not.toBeNull();
expect(measurement.desktopNavigation, `${label}: exposed destinations`).toBeNull();
expect(measurement.websiteTrigger?.left, `${label}: website trigger edge`).toBeLessThan(
  measurement.brand?.left || 0
);
expect(measurement.sectionTrigger?.left, `${label}: section trigger edge`).toBeGreaterThan(
  measurement.brand?.right || 0
);
expect(Math.abs(measurement.brandCenter - measurement.shellCenter), `${label}: centered brand`).toBeLessThanOrEqual(1);
expect(measurement.horizontalOverflow, `${label}: horizontal overflow`).toBeLessThanOrEqual(1);
```

- [ ] **Step 2: Add rendered drawer-direction checks**

On a sectioned route, open each drawer independently and verify its viewport edge:

```ts
await page.getByRole("button", { name: "Open website navigation" }).click();
const websiteDrawer = page.locator(".mobile-nav-drawer .rs-drawer-dialog");
await expect(websiteDrawer).toBeVisible();
expect((await websiteDrawer.boundingBox())?.x).toBe(0);
await page.getByRole("button", { name: "Close website navigation" }).click();

await page.getByRole("button", { name: /open section navigation/i }).click();
const sectionDrawer = page.locator(".mobile-section-nav-drawer .rs-drawer-dialog");
await expect(sectionDrawer).toBeVisible();
const sectionBox = await sectionDrawer.boundingBox();
expect(Math.round((sectionBox?.x || 0) + (sectionBox?.width || 0))).toBe(page.viewportSize()?.width);
```

- [ ] **Step 3: Update compact drawer-stability selectors and names**

Change `Open navigation menu` queries to `Open website navigation`, keep the no-reload assertion, and retain checks for resume, color, accessibility, close, and client-side route selection.

- [ ] **Step 4: Run only the affected Playwright specifications**

Run:

```powershell
npm.cmd exec playwright test playwright/route-sidebar-responsive.spec.ts playwright/mobile-menu-stability.spec.ts --workers=1
```

Expected: PASS for all approved viewport cases and both drawer directions.

- [ ] **Step 5: Update navigation documentation**

Document the persistent three-track header, left website drawer, right section drawer, icon-only accessible names, `Ctrl+Shift+M`, Escape behavior, and the absence of breakpoint-dependent navigation modes. Do not change route, SEO, or deployment documentation.

- [ ] **Step 6: Format and lint only the affected files**

Run:

```powershell
npm.cmd exec prettier -- --write src/components/navigation/UnifiedNavigation/index.jsx src/components/navigation/UnifiedNavigation/styles.css src/components/navigation/MobileSectionNavTrigger/index.jsx src/components/navigation/MobileSectionNavTrigger/styles.css src/components/navigation/__tests__/StickyNav.test.jsx src/components/navigation/__tests__/StickySectionNav.test.jsx src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx playwright/route-sidebar-responsive.spec.ts playwright/mobile-menu-stability.spec.ts docs/navigation.md docs/superpowers/specs/2026-08-11-opposed-navigation-drawers-design.md docs/superpowers/plans/2026-08-11-opposed-navigation-drawers.md
npm.cmd exec eslint -- src/components/navigation/UnifiedNavigation/index.jsx src/components/navigation/MobileSectionNavTrigger/index.jsx src/components/navigation/__tests__/StickyNav.test.jsx src/components/navigation/__tests__/StickySectionNav.test.jsx src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx playwright/route-sidebar-responsive.spec.ts playwright/mobile-menu-stability.spec.ts --max-warnings=0
npm.cmd exec stylelint -- src/components/navigation/UnifiedNavigation/styles.css src/components/navigation/MobileSectionNavTrigger/styles.css
```

Expected: all affected-file formatting and lint checks pass.

- [ ] **Step 7: Perform rendered QA before the broad gate**

Inspect Home plus one sectioned route at 320x568, 390x844, 844x390, 900x650, 940x650, 1024x768, 1280x500, and 1440x900. Verify the centered brand, opposed icon placement, both drawers, focus rings, current states, anchor landing, one-row containment, and no app-owned console errors.

- [ ] **Step 8: Run the final broad verification once**

Run these commands only after all focused checks and rendered QA pass:

```powershell
npm.cmd run quality:check
npm.cmd run build
npm.cmd run quality:bundle-budgets
npm.cmd run quality:route-tests
npm.cmd run seo:check
```

Expected: full unit/browser quality gate, production build, bundle budgets, route mapping, and static SEO validation all pass.

- [ ] **Step 9: Inspect final scope and prepare an uncommitted handoff**

Run:

```powershell
git diff --check
git status --short --branch
git diff --stat
git diff -- src/components/navigation playwright/route-sidebar-responsive.spec.ts playwright/mobile-menu-stability.spec.ts docs/navigation.md docs/superpowers/specs/2026-08-11-opposed-navigation-drawers-design.md docs/superpowers/plans/2026-08-11-opposed-navigation-drawers.md
```

Expected: only approved navigation code, tests, and documentation are changed; `design-qa.md` remains untouched; nothing is staged, committed, pushed, or deployed.
