# Unified Full-Width Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the separate content-width primary and section navigation bars with one sticky, viewport-edge navigation surface that contains the page-level section control and remains orderly at every approved viewport.

**Architecture:** Add a page-level `UnifiedNavigation` component that owns the single full-bleed shell, the responsive primary navigation, and one optional `StickySectionNav` instance. Preserve the primary and section drawers as separate interaction layers, keep `StickyNav` as a thin compatibility adapter, and migrate every route to the unified public API so section navigation is no longer rendered in a page sidebar.

**Tech Stack:** React 19, React Router 8, RSuite, Font Awesome, layout-style-css, ui-style-kit-css, interactive-surface-css, Vitest, Testing Library, Playwright, ESLint, Stylelint, Prettier.

## Global Constraints

- Preserve every existing route, destination label, active-route rule, drawer shortcut, scroll-spy behavior, URL hash update, focus behavior, accessibility utility, resume action, and theme control.
- Render exactly one visible sticky header surface at a time; its shell must meet the viewport's left, top, and right edges within one CSS pixel.
- Keep the primary navigation drawer and the section navigation drawer separate. Do not duplicate `StickySectionNav`, its scroll-spy hook, or its drawer.
- Use `layout-style-css` for layout, `ui-style-kit-css` for theme and paint, and `interactive-surface-css` for interaction states. App CSS may compose those libraries but must not replace their responsibilities.
- Keep all controls in one row without overlap or horizontal document overflow at 320x568, 390x844, 844x390, 900x650, 939x650, 940x650, 1024x768, 1280x500, and 1440x900.
- Preserve the compact mobile order `KF / section control / menu` and the desktop order `KF / primary links / section control / utilities`. Routes without sections omit the middle section control cleanly.
- On narrow phones, visually shorten the section label to `Sections` while keeping the trigger's accessible name tied to the current section.
- Do not change page content, typography, color direction, Mermaid behavior, footer behavior, SEO metadata, or deployment configuration.
- Add professional comments only where they explain a non-obvious layout or interaction contract. Keep JSX, CSS, tests, and documentation lint- and format-clean.
- Do not stage, edit, or remove the user-owned `design-qa.md` file.
- Use focused tests while implementing. Run the full repository verification only after all implementation tasks are complete.

## File Responsibility Map

| File | Responsibility |
| --- | --- |
| `src/components/navigation/UnifiedNavigation/index.jsx` | Own the single sticky shell, primary links, utilities, optional section control, primary drawer, keyboard behavior, and measured nav-height CSS variable. |
| `src/components/navigation/UnifiedNavigation/styles.css` | Compose the full-bleed shell, constrained inner row, breakpoint behavior, truncation, and control ordering without document overflow. |
| `src/components/navigation/StickyNav/index.jsx` | Provide a documented compatibility adapter to `UnifiedNavigation` while old direct consumers are retired. |
| `src/components/navigation/StickyNav/styles.css` | Retain only drawer and primary-control styles that remain component-specific; remove the obsolete second desktop/mobile surface styling. |
| `src/components/navigation/StickySectionNav/index.jsx` | Preserve scroll-spy and section navigation coordination inside the unified header. |
| `src/components/navigation/MobileSectionNavTrigger/index.jsx` | Render the embedded section command and separate section drawer with full and compact visual labels. |
| `src/components/navigation/MobileSectionNavTrigger/styles.css` | Size the embedded command as a row child and provide overflow-safe label truncation. |
| `src/components/navigation/index.jsx` | Lazy-export `UnifiedNavigation` as the route-level public API. |
| `src/App.css` | Remove obsolete page-sidebar sticky/grid-row rules and retain a one-column content layout. |
| `src/pages/{CodeStream,Docs,Hackathon,InterfaceSystem,SMU,SandersonTechnologyEnterprises,SideProjects}/index.jsx` | Pass route sections and canonical page URL directly to `UnifiedNavigation`; remove the later sidebar control. |
| `src/pages/{Home,Contact,NotFound}/index.jsx` | Use `UnifiedNavigation` without section props. |
| `src/components/navigation/__tests__/UnifiedNavigation.test.jsx` | Cover the single-shell DOM contract, optional section control, compact label semantics, active routes, drawers, and shortcuts. |
| `src/components/navigation/__tests__/{StickyNav,StickySectionNav,MobileSectionNavTrigger}.test.jsx` | Retain focused compatibility, scroll-spy, drawer, and accessible-label contracts without duplicating unified-shell assertions. |
| `src/pages/**/**.test.{js,jsx}` | Update navigation mocks and assertions to the new route-level API. |
| `playwright/route-sidebar-responsive.spec.ts` | Become the browser-level responsive regression suite for full-bleed alignment, one-row containment, offsets, and all sectioned routes. |
| `playwright/mobile-menu-stability.spec.ts` | Target the unified mobile row while preserving drawer stability assertions. |
| `playwright/ui-style-visual-distinction.spec.ts` | Measure the embedded section control instead of the removed sidebar wrapper. |
| `src/styles/uiStyleCompatibility.test.js` | Preserve the custom-library compatibility assertions for the new composed selectors. |

---

### Task 1: Lock the unified-navigation contract with failing tests

**Files:**

- Create: `src/components/navigation/__tests__/UnifiedNavigation.test.jsx`
- Modify: `src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx`
- Modify: `playwright/route-sidebar-responsive.spec.ts`

- [ ] Add a focused component test that renders a sectioned route and requires exactly one shell with both navigation landmarks inside it:

```jsx
it("places primary and section navigation inside one page-level header", () => {
  renderWithProviders(
    <UnifiedNavigation
      activePage={PageRoute.INTERFACE_SYSTEM}
      pageUrl={PageRoute.INTERFACE_SYSTEM}
      sections={sections}
    />
  );

  const shell = screen.getByTestId("unified-navigation");
  expect(screen.getAllByTestId("unified-navigation")).toHaveLength(1);
  expect(within(shell).getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  expect(within(shell).getByRole("navigation", { name: "On this page" })).toBeVisible();
});
```

- [ ] Add the no-sections contract so simple routes have the same shell without an empty section landmark:

```jsx
it("omits the section control when the route has no section model", () => {
  renderWithProviders(<UnifiedNavigation activePage={PageRoute.HOME} />);

  const shell = screen.getByTestId("unified-navigation");
  expect(within(shell).queryByRole("navigation", { name: "On this page" })).toBeNull();
  expect(within(shell).getByRole("button", { name: "Open navigation menu" })).toBeVisible();
});
```

- [ ] Extend the section-trigger test to require separate full and compact visual labels while preserving the current-section accessible name:

```jsx
expect(screen.getByText("On this page")).toHaveClass("route-section-nav__label--full");
expect(screen.getByText("Sections")).toHaveClass("route-section-nav__label--compact");
expect(
  screen.getByRole("button", { name: "Open section navigation: Architecture" })
).toBeVisible();
```

- [ ] Replace the old two-layer Playwright measurement with one unified-shell measurement:

```ts
const shell = box(document.querySelector('[data-testid="unified-navigation"]'));
const primary = box(document.querySelector('[aria-label="Primary navigation"]'));
const sections = box(document.querySelector('[aria-label="On this page"]'));
const rowCenters = Array.from(
  document.querySelectorAll('[data-testid="unified-navigation"] .unified-navigation__inner > *')
)
  .filter((element) => window.getComputedStyle(element).display !== "none")
  .map((element) => {
    const rect = element.getBoundingClientRect();
    return Math.round(rect.top + rect.height / 2);
  });

return {
  shell,
  primary,
  sections,
  rowCenters,
  shellCount: document.querySelectorAll('[data-testid="unified-navigation"]').length,
  sidebarCount: document.querySelectorAll(".page-sidebar").length,
};
```

- [ ] Assert the approved viewport matrix, viewport-edge tolerance, one visual row, absent sidebar, and no horizontal overflow:

```ts
expect(measurement.shellCount, label).toBe(1);
expect(measurement.sidebarCount, label).toBe(0);
expect(Math.abs(measurement.shell?.left ?? 999), label).toBeLessThanOrEqual(1);
expect(Math.abs((measurement.shell?.right ?? 0) - viewport.width), label).toBeLessThanOrEqual(1);
expect(measurement.horizontalOverflow, label).toBeLessThanOrEqual(1);
expect(Math.max(...measurement.rowCenters) - Math.min(...measurement.rowCenters), label).toBeLessThanOrEqual(1);
```

- [ ] Run the component tests and confirm they fail because `UnifiedNavigation` and the compact label do not yet exist:

```powershell
npm.cmd exec vitest run -- src/components/navigation/__tests__/UnifiedNavigation.test.jsx src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx --maxWorkers=2
```

Expected: FAIL with missing `UnifiedNavigation` import/export and compact-label assertions.

- [ ] Run the single browser regression and confirm it fails against the current content-width, two-layer layout:

```powershell
npm.cmd exec playwright test playwright/route-sidebar-responsive.spec.ts --workers=1 --grep "unified navigation"
```

Expected: FAIL because the unified shell is absent and `.page-sidebar` still exists.

- [ ] Commit the red tests without staging `design-qa.md`:

```powershell
git add src/components/navigation/__tests__/UnifiedNavigation.test.jsx src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx playwright/route-sidebar-responsive.spec.ts
git commit -m "test: define unified navigation contracts"
```

### Task 2: Build the single shell and preserve navigation behavior

**Files:**

- Create: `src/components/navigation/UnifiedNavigation/index.jsx`
- Create: `src/components/navigation/UnifiedNavigation/styles.css`
- Modify: `src/components/navigation/StickyNav/index.jsx`
- Modify: `src/components/navigation/StickyNav/styles.css`
- Modify: `src/components/navigation/MobileSectionNavTrigger/index.jsx`
- Modify: `src/components/navigation/MobileSectionNavTrigger/styles.css`
- Modify: `src/components/navigation/index.jsx`
- Modify: `src/components/navigation/__tests__/StickyNav.test.jsx`
- Modify: `src/components/navigation/__tests__/StickySectionNav.test.jsx`

- [ ] Move the existing primary-navigation state and handlers into `UnifiedNavigation`, adding optional `sections` and `pageUrl` props without changing route or drawer behavior. Extract the existing JSX into file-local `PrimaryNavigation`, `NavigationUtilities`, and `PrimaryNavigationDrawer` components so the page-level shell remains readable without changing behavior.

- [ ] Render one shared brand, one responsive primary landmark, one optional `StickySectionNav`, one utilities group, and one mobile trigger inside a single shell:

```jsx
const hasSections = Array.isArray(sections) && sections.length > 0;

return (
  <>
    <header
      className="unified-navigation"
      data-testid="unified-navigation"
      data-has-sections={hasSections ? "true" : "false"}
    >
      <div className="unified-navigation__inner">
        <Link className="unified-navigation__brand" to={PageRoute.HOME} aria-label="Kyle Foster home">
          KF
        </Link>
        <PrimaryNavigation activePage={activePage} />
        {hasSections ? (
          <div className="unified-navigation__sections">
            <StickySectionNav pageUrl={pageUrl || activePage} sections={sections} />
          </div>
        ) : null}
        <NavigationUtilities
          downloadName={resumeDownloadName}
          previewSubtitle={resumePreviewSubtitle}
          previewTitle={resumePreviewTitle}
        />
        <Btn
          className="unified-navigation__menu-trigger"
          icon={faBars}
          ariaLabel="Open navigation menu"
          onClick={openPrimaryDrawer}
        />
      </div>
    </header>
    <PrimaryNavigationDrawer
      activePage={activePage}
      downloadName={resumeDownloadName}
      onClose={closeMobileNav}
      open={mobileOpen}
      previewSubtitle={resumePreviewSubtitle}
      previewTitle={resumePreviewTitle}
    />
  </>
);
```

- [ ] Measure only the unified shell and continue publishing `--portfolio-primary-nav-height` for anchor offsets and other persistent controls:

```jsx
useLayoutEffect(() => {
  const shell = document.querySelector('[data-testid="unified-navigation"]');
  if (!shell) return undefined;

  const publishHeight = () => {
    const renderedHeight = Math.ceil(shell.getBoundingClientRect().height);
    if (renderedHeight > 0) {
      document.documentElement.style.setProperty(
        "--portfolio-primary-nav-height",
        `${renderedHeight}px`
      );
    }
  };

  const observer = new ResizeObserver(publishHeight);
  observer.observe(shell);
  publishHeight();
  return () => observer.disconnect();
}, []);
```

- [ ] Keep `StickyNav` as a documented compatibility adapter with no independent surface or behavior:

```jsx
import UnifiedNavigation from "../UnifiedNavigation";

/**
 * Preserve the former import boundary while routes migrate to UnifiedNavigation.
 *
 * @param {object} props - Unified navigation properties.
 * @returns {JSX.Element} Unified page navigation.
 */
const StickyNav = (props) => <UnifiedNavigation {...props} />;

export default StickyNav;
```

- [ ] Add full and compact labels to the embedded section command; retain the active-section button's existing accessible name:

```jsx
<span className="route-section-nav__label route-section-nav__label--full">On this page</span>
<span className="route-section-nav__label route-section-nav__label--compact" aria-hidden="true">
  Sections
</span>
```

- [ ] Add the lazy public export:

```jsx
const UnifiedNavigation = withLazySuspense(
  () => import("./UnifiedNavigation"),
  "UnifiedNavigation"
);

export { Footer, Head, MobileSectionNavTrigger, SectionAnchorNav, StickyNav, StickySectionNav, UnifiedNavigation, helpers };
```

- [ ] Migrate the existing primary-navigation unit tests to `UnifiedNavigation`, keeping explicit coverage for active grouped routes, mouse navigation, `Ctrl+Shift+M`, Escape, drawer close focus behavior, utilities, and resume controls.

- [ ] Run only the navigation unit tests:

```powershell
npm.cmd exec vitest run -- src/components/navigation/__tests__/UnifiedNavigation.test.jsx src/components/navigation/__tests__/StickyNav.test.jsx src/components/navigation/__tests__/StickySectionNav.test.jsx src/components/navigation/__tests__/MobileSectionNavTrigger.test.jsx --maxWorkers=2
```

Expected: PASS.

- [ ] Commit the component behavior:

```powershell
git add src/components/navigation/UnifiedNavigation src/components/navigation/StickyNav src/components/navigation/MobileSectionNavTrigger src/components/navigation/index.jsx src/components/navigation/__tests__
git commit -m "feat: unify primary and section navigation"
```

### Task 3: Migrate every route and remove the obsolete sidebar layer

**Files:**

- Modify: `src/pages/CodeStream/index.jsx`
- Modify: `src/pages/Docs/index.jsx`
- Modify: `src/pages/Hackathon/index.jsx`
- Modify: `src/pages/InterfaceSystem/index.jsx`
- Modify: `src/pages/SMU/index.jsx`
- Modify: `src/pages/SandersonTechnologyEnterprises/index.jsx`
- Modify: `src/pages/SideProjects/index.jsx`
- Modify: `src/pages/Home/index.jsx`
- Modify: `src/pages/Contact/index.jsx`
- Modify: `src/pages/NotFound/index.jsx`
- Modify: `src/App.css`
- Modify: `src/pages/__tests__/Contact.test.jsx`
- Modify: `src/pages/__tests__/CodeStream.test.jsx`
- Modify: `src/pages/SideProjects/SideProjects.deferDiagrams.test.jsx`
- Modify: any route test mock discovered by `rg -n "StickyNav|StickySectionNav" src/pages --glob "*.test.*"`

- [ ] Replace the paired navigation imports on each sectioned route with the unified public component:

```jsx
import { Footer, helpers, UnifiedNavigation } from "components/navigation";
```

- [ ] Pass the route model once at the top of each sectioned page:

```jsx
<UnifiedNavigation activePage={csos.url} pageUrl={csos.url} sections={csos.sections} />
```

- [ ] Remove the later sidebar wrapper and leave content as the sole child of the route layout:

```jsx
<div className="page-layout">
  <main className="page-content app-main" role="main">
    {csos.sections.map((section) => (
      <SectionRenderer
        section={section}
        deferDiagrams={DIAGRAM_DEFER_CONFIG}
        key={section.id}
      />
    ))}
  </main>
</div>
```

- [ ] Migrate Home, Contact, and NotFound with no section props:

```jsx
<UnifiedNavigation activePage={home.url} />
```

- [ ] Remove `.page-sidebar` and obsolete `ly-sidebar__side` row/sticky rules from `App.css`; preserve `.page-layout` and `.page-content` as a one-column, min-width-safe content shell.

- [ ] Update route-test mocks to accept the new API and expose both landmarks when sections are supplied:

```jsx
UnifiedNavigation: ({ activePage, sections }) => (
  <header data-active-page={activePage} data-testid="unified-navigation">
    <nav aria-label="Primary navigation" />
    {sections?.length ? <nav aria-label="On this page" /> : null}
  </header>
),
```

- [ ] Prove all direct page usage has migrated:

```powershell
rg -n "<StickyNav|<StickySectionNav|page-sidebar" src/pages
```

Expected: no matches outside historical test descriptions that are updated in the same task.

- [ ] Run the navigation tests plus only the route tests changed by this task:

```powershell
npm.cmd exec vitest run -- src/components/navigation/__tests__ src/pages/__tests__/Contact.test.jsx src/pages/__tests__/CodeStream.test.jsx src/pages/SideProjects/SideProjects.deferDiagrams.test.jsx src/pages/Hackathon/Hackathon.test.js src/pages/SMU/SMU.test.jsx src/pages/SideProjects/SideProjects.test.js --maxWorkers=2
```

Expected: PASS.

- [ ] Commit the route migration:

```powershell
git add src/pages src/App.css
git commit -m "refactor: move section controls into the site header"
```

### Task 4: Make the bar full-bleed and verify responsive containment

**Files:**

- Modify: `src/components/navigation/UnifiedNavigation/styles.css`
- Modify: `src/components/navigation/StickyNav/styles.css`
- Modify: `src/components/navigation/MobileSectionNavTrigger/styles.css`
- Modify: `playwright/route-sidebar-responsive.spec.ts`
- Modify: `playwright/mobile-menu-stability.spec.ts`
- Modify: `playwright/ui-style-visual-distinction.spec.ts`
- Modify: `src/styles/uiStyleCompatibility.test.js`

- [ ] Compose the full-bleed shell and constrained inner row. The negative inline margin is the intentional bridge from the content wrapper to the viewport:

```css
.unified-navigation {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100vw;
  margin-inline: calc(50% - 50vw);
  border-block: var(--glass-border);
  background: var(--glass-bg);
  box-shadow: var(--glass-shadow);
  backdrop-filter: var(--slight-blur);
}

.unified-navigation__inner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) minmax(0, auto) auto;
  align-items: center;
  gap: clamp(0.35rem, 1vw, 0.75rem);
  width: min(var(--page-max-width), calc(100% - (var(--page-gutter) * 2)));
  min-width: 0;
  margin-inline: auto;
}
```

- [ ] Prevent every flexible child from forcing overflow and truncate the current section label before controls collide:

```css
.unified-navigation__primary,
.unified-navigation__sections,
.route-section-nav,
.route-section-nav__trigger {
  min-width: 0;
}

.route-section-nav__trigger .btn-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- [ ] Use the compact row below the existing content-fit breakpoint while keeping the section control between brand and menu:

```css
@media (width < 940px) {
  .unified-navigation__inner {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .unified-navigation__primary,
  .unified-navigation__utilities {
    display: none;
  }

  .unified-navigation__menu-trigger {
    display: inline-flex;
    grid-column: 3;
  }
}

@media (width <= 390px) {
  .route-section-nav__label--full {
    display: none;
  }

  .route-section-nav__label--compact {
    display: inline;
  }
}
```

- [ ] Add a no-sections placement rule so the mobile menu stays at the far right:

```css
.unified-navigation[data-has-sections="false"] .unified-navigation__menu-trigger {
  grid-column: -2 / -1;
}
```

- [ ] Update browser regressions to target the unified shell, embedded section nav, and mobile trigger. Preserve drawer-within-viewport, Escape-close, back-to-top bottom gap, opaque command background, active-section click, and no-overflow assertions.

- [ ] Verify section navigation respects the measured header height after a drawer selection:

```ts
const positions = await page.evaluate(() => {
  const shell = document.querySelector('[data-testid="unified-navigation"]')?.getBoundingClientRect();
  const target = document.querySelector("#published-packages")?.getBoundingClientRect();
  return { shellBottom: shell?.bottom ?? 0, targetTop: target?.top ?? 0 };
});
expect(positions.targetTop).toBeGreaterThanOrEqual(positions.shellBottom - 1);
```

- [ ] Run the focused browser and compatibility suites:

```powershell
npm.cmd exec playwright test playwright/route-sidebar-responsive.spec.ts playwright/mobile-menu-stability.spec.ts playwright/ui-style-visual-distinction.spec.ts --workers=1
npm.cmd exec vitest run -- src/styles/uiStyleCompatibility.test.js --maxWorkers=2
```

Expected: PASS at every approved viewport with no overlap or horizontal overflow.

- [ ] Run scoped lint and formatting checks:

```powershell
npm.cmd exec eslint src/components/navigation src/pages --max-warnings=0
npm.cmd exec stylelint "src/components/navigation/**/*.css" "src/App.css"
npm.cmd exec prettier -- --check src/components/navigation src/pages src/App.css playwright/route-sidebar-responsive.spec.ts playwright/mobile-menu-stability.spec.ts playwright/ui-style-visual-distinction.spec.ts
```

Expected: PASS with zero warnings.

- [ ] Commit the responsive finish:

```powershell
git add src/components/navigation src/styles/uiStyleCompatibility.test.js src/App.css playwright/route-sidebar-responsive.spec.ts playwright/mobile-menu-stability.spec.ts playwright/ui-style-visual-distinction.spec.ts
git commit -m "fix: contain the full-width navigation row"
```

### Task 5: Perform final quality verification and update PR #111

**Files:**

- Verify: all changed implementation, test, and plan files
- Preserve: `design-qa.md`

- [ ] Inspect the final diff and confirm only intended navigation, route, test, and documentation files changed:

```powershell
git status --short --branch
git diff --stat origin/feat/portfolio-app-remodel...HEAD
git diff --check origin/feat/portfolio-app-remodel...HEAD
```

Expected: no whitespace errors; `design-qa.md` remains untracked and unstaged.

- [ ] Run the full verification once, now that implementation is complete:

```powershell
npm.cmd run lint:all
npm.cmd run test
npm.cmd run build
npm.cmd run seo:check
```

Expected: all commands PASS. If one section fails, rerun only that failing command after the smallest justified correction.

- [ ] Complete rendered browser QA at 320x568, 390x844, 844x390, 900x650, 939x650, 940x650, 1024x768, 1280x500, and 1440x900. Check Home plus every sectioned route, both drawers, keyboard focus, current-section truncation, anchor landing, and back-to-top placement.

- [ ] Confirm the user-owned file is unchanged:

```powershell
Get-FileHash -Algorithm SHA256 design-qa.md
git status --short design-qa.md
```

Expected SHA256: `C087A59F0D4D1E9C5BAF170976A0667570C236ED33FAC5C7D68F64351AA4C36F`; status remains `?? design-qa.md`.

- [ ] If verification produced a necessary tracked correction, inspect `git diff --name-only`, stage each corrected path explicitly, repeat its focused check, and create the professional commit `chore: finalize unified navigation verification`. If no correction was needed, do not create an empty commit.

- [ ] Push the current branch and update the existing pull request rather than opening a duplicate:

```powershell
git push origin feat/portfolio-app-remodel
gh pr view 111 --json url,headRefName,state,statusCheckRollup
```

Expected: PR #111 points to `feat/portfolio-app-remodel` and includes the unified navigation commits. Report local verification separately from any remote checks that are still pending.
