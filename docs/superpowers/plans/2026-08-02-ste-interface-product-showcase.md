# STE Interface and Product Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a compact responsive section-navigation system and a focused STE case study with current interface libraries, two self-hosted product promos, and working public product/library links.

**Architecture:** Extend the declarative content system with a reusable video block and semantic icon support instead of adding page-specific JSX. Keep shared libraries responsible for paint, interaction state, layout, and icon artwork while app CSS owns only route composition, responsive sizing, and media framing.

**Tech Stack:** React 19, Vite 8, Vitest, Testing Library, Playwright, RSuite, CSS, Mermaid, ui-style-kit-css, ui-style-kit-icons, layout-style-css, interactive-surface-css.

## Global Constraints

- Work in the current dirty `STEupgrade` branch and preserve every unrelated existing change.
- Do not commit, reset, stash, or push; the user will push the combined branch into a PR.
- Use exact public names `Scrap Yard System` and `Content Creator Platform`.
- Preserve source MP4 bytes and render controls with `playsInline`, `preload="metadata"`, and no autoplay.
- Never split ordinary navigation words; wrapping may occur only at natural whitespace.
- Keep professional comments and pass formatting and lint checks.
- Use exact library versions: `ui-style-kit-css@2.1.0`, `ui-style-kit-icons@1.0.0`, `layout-style-css@3.0.0`, and `interactive-surface-css@1.5.0`.

---

### Task 1: Upgrade and wire the interface libraries

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/main.jsx`
- Modify: `src/styles/uiStyleCompatibility.test.js`

**Interfaces:**
- Consumes: published npm package exports.
- Produces: global `<usk-icon>` registration plus current library CSS available to every route.

- [ ] **Step 1: Update the compatibility assertions first**

Assert the four exact dependency versions and the following entry imports:

```js
expect(mainJs).toContain('import "ui-style-kit-icons/css.css";');
expect(mainJs).toContain('import "ui-style-kit-icons/element";');
expect(packageManifest.dependencies).toHaveProperty("ui-style-kit-css", "2.1.0");
expect(packageManifest.dependencies).toHaveProperty("ui-style-kit-icons", "1.0.0");
expect(packageManifest.dependencies).toHaveProperty("layout-style-css", "3.0.0");
expect(packageManifest.dependencies).toHaveProperty("interactive-surface-css", "1.5.0");
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm.cmd exec vitest run -- src/styles/uiStyleCompatibility.test.js`

Expected: FAIL because the manifest and entrypoint do not contain the new icon dependency/imports or current versions.

- [ ] **Step 3: Install the exact package versions**

Run:

```powershell
npm.cmd install --save-exact ui-style-kit-css@2.1.0 ui-style-kit-icons@1.0.0 layout-style-css@3.0.0 interactive-surface-css@1.5.0
```

Add the icon CSS and element imports after the other library imports and before app-specific styles in `src/main.jsx`.

- [ ] **Step 4: Verify GREEN**

Run: `npm.cmd exec vitest run -- src/styles/uiStyleCompatibility.test.js`

Expected: PASS with all four package and entrypoint contracts satisfied.

### Task 2: Add a reusable accessible video block

**Files:**
- Create: `src/components/renderers/blocks/VideoBlock/index.jsx`
- Create: `src/components/renderers/blocks/VideoBlock/styles.css`
- Create: `src/components/renderers/blocks/VideoBlock/VideoBlock.test.jsx`
- Modify: `src/components/renderers/blocks/index.js`
- Modify: `src/components/renderers/__tests__/SectionRenderer.test.jsx`
- Modify: `src/components/renderers/SectionRenderer/index.jsx`
- Modify: `src/types/ui.types.js`

**Interfaces:**
- Consumes: `{ id, title, src, mimeType, caption, ariaLabel }`.
- Produces: `BlockType.VIDEO`, `createVideoBlock(block)`, and `<VideoBlock />` dispatch.

- [ ] **Step 1: Write the failing component and dispatch tests**

Test real rendered behavior:

```jsx
render(
  <VideoBlock
    id="product-promo"
    title="Product demonstration"
    src="/promo.mp4"
    mimeType="video/mp4"
    caption="A concise product walkthrough."
    ariaLabel="Product demonstration video"
  />
);

const video = screen.getByLabelText("Product demonstration video");
expect(video).toHaveAttribute("controls");
expect(video).toHaveAttribute("playsinline");
expect(video).toHaveAttribute("preload", "metadata");
expect(video).not.toHaveAttribute("autoplay");
expect(video.querySelector("source")).toHaveAttribute("src", "/promo.mp4");
```

Add a SectionRenderer fixture using `BlockType.VIDEO` and assert the video dispatch target renders.

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```powershell
npm.cmd exec vitest run -- src/components/renderers/blocks/VideoBlock/VideoBlock.test.jsx src/components/renderers/__tests__/SectionRenderer.test.jsx
```

Expected: FAIL because the block type, factory, component, and dispatch do not exist.

- [ ] **Step 3: Implement the minimal video contract**

Render a collapsible `Panel` containing:

```jsx
<figure className="video-block__figure">
  <video className="video-block__media" controls playsInline preload="metadata" aria-label={ariaLabel}>
    <source src={src} type={mimeType} />
    Your browser does not support embedded MP4 video.
  </video>
  {caption ? <figcaption className="video-block__caption">{caption}</figcaption> : null}
</figure>
```

Return `null` for missing `src`. Style the media as responsive 16:9 content with shared surface tokens and no autoplay behavior.

- [ ] **Step 4: Verify GREEN**

Run the same focused test command and expect PASS.

### Task 3: Focus the STE products and public links

**Files:**
- Create: `src/assets/videos/ste/salvage-yard-system-promo.mp4`
- Create: `src/assets/videos/ste/content-creator-platform-promo.mp4`
- Modify: `src/assets/data/content/sanderson-technology-enterprises/index.js`
- Modify: `src/assets/data/content/sanderson-technology-enterprises/steContent.test.js`
- Modify: `src/assets/data/pageSummaryMetas.js`
- Modify: `src/assets/data/pageSummaryMetas.test.js`
- Modify: `playwright/pages/sanderson-technology-enterprises.spec.ts`

**Interfaces:**
- Consumes: `BlockType.VIDEO` and the two approved source videos.
- Produces: focused Content Creator Platform and Scrap Yard System sections with direct public CTAs.

- [ ] **Step 1: Update content tests first**

Require section order:

```js
expect(sectionIds).toEqual([
  "ste-overview",
  "ste-website",
  "ste-content-creator-platform",
  "ste-scrap-yard-system",
  "ste-interface-system",
  "ste-links",
]);
```

Assert one video block per product, exact public URLs, exact names, and absence of the generic section title.

- [ ] **Step 2: Run content tests and verify RED**

Run:

```powershell
npm.cmd exec vitest run -- src/assets/data/content/sanderson-technology-enterprises/steContent.test.js src/assets/data/pageSummaryMetas.test.js
```

Expected: FAIL because focused section IDs, videos, names, and links are missing.

- [ ] **Step 3: Copy source videos byte-for-byte**

Copy from:

```text
C:\Users\Foscat Laptop\Desktop\site\assets\videos\salvage-yard-system-promo.mp4
C:\Users\Foscat Laptop\Desktop\site\assets\videos\content-creator-platform-promo.mp4
```

Verify source and destination SHA-256 hashes match.

- [ ] **Step 4: Implement focused product content**

Import both videos, replace the generic white-label section with Content Creator Platform, rename the scrapyard section to Scrap Yard System, add one `VIDEO` block to each, and add direct product-page links:

```js
const SCRAP_YARD_SYSTEM_URL = `${PUBLIC_STE_URL}scrap-yard-system.html`;
const CONTENT_CREATOR_PLATFORM_URL = `${PUBLIC_STE_URL}content-creator-platform.html`;
```

Keep the public-safe white-label architecture language in the overview and product descriptions.

- [ ] **Step 5: Verify GREEN**

Run the same focused content tests and expect PASS.

### Task 4: Render all four interface libraries with working icons and links

**Files:**
- Modify: `src/components/ui/InsightCard/index.jsx`
- Modify: `src/components/ui/InsightCard/style.css`
- Modify: `src/components/ui/InsightCard/InsightCard.test.jsx`
- Modify: `src/components/renderers/blocks/CardGridBlock/index.jsx`
- Modify: `src/assets/data/content/sanderson-technology-enterprises/index.js`
- Modify: `src/assets/data/content/sanderson-technology-enterprises/diagrams.js`
- Modify: `src/assets/data/content/sanderson-technology-enterprises/steContent.test.js`

**Interfaces:**
- Consumes: optional `iconName` card metadata and the registered `<usk-icon>` element.
- Produces: semantic icon rendering with Font Awesome fallback plus four linked ecosystem cards.

- [ ] **Step 1: Write the failing icon behavior test**

Render `InsightCard` with `iconName="layout"`, then assert a `usk-icon` element exists with `name="layout"` and `frame="soft"`. Keep the existing Font Awesome test as the fallback contract.

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```powershell
npm.cmd exec vitest run -- src/components/ui/InsightCard/InsightCard.test.jsx src/assets/data/content/sanderson-technology-enterprises/steContent.test.js
```

Expected: FAIL because `iconName` and the fourth library card do not exist.

- [ ] **Step 3: Implement semantic icons and four library cards**

Pass `iconName` through `CardGridBlock`. In `InsightCard`, prefer:

```jsx
{iconName ? <usk-icon name={iconName} frame="soft" aria-hidden="true" /> : null}
```

and retain `FrostedIcon` when only `icon` is present. Add linked cards for Layout Style CSS, UI Style Kit CSS, UI Style Kit Icons, and Interactive Surface CSS. Update the Mermaid flow so the icon layer joins the other three layers before STE products.

- [ ] **Step 4: Verify GREEN**

Run the same focused tests and expect PASS.

### Task 5: Fix word wrapping and compact shared layout rhythm

**Files:**
- Modify: `src/components/navigation/StickySectionNav/index.jsx`
- Modify: `src/components/navigation/StickySectionNav/styles.css`
- Modify: `src/components/navigation/MobileSectionNavTrigger/styles.css`
- Modify: `src/components/layout/InfoSection/styles.css`
- Modify: `src/App.css`
- Modify: `src/styles/uiStyleCompatibility.test.js`
- Modify: `src/components/navigation/__tests__/StickySectionNav.test.jsx`

**Interfaces:**
- Consumes: optional `section.navLabel`.
- Produces: compact natural-word wrapping and a synchronized 1200px desktop rail breakpoint.

- [ ] **Step 1: Add failing contract and component tests**

Assert the CSS uses `@media (width < 1200px)` / `@media (width >= 1200px)`, no section-navigation selector uses `overflow-wrap: anywhere`, and the component renders `navLabel` instead of the full title when provided.

- [ ] **Step 2: Run focused tests and verify RED**

Run:

```powershell
npm.cmd exec vitest run -- src/styles/uiStyleCompatibility.test.js src/components/navigation/__tests__/StickySectionNav.test.jsx
```

Expected: FAIL against the 1024px breakpoint and arbitrary word wrapping.

- [ ] **Step 3: Implement compact responsive styles**

Set the JavaScript and CSS breakpoint to 1200px. Add compact `navLabel` values to STE sections. For section navigation use:

```css
white-space: normal;
overflow-wrap: normal;
word-break: normal;
hyphens: none;
text-wrap: balance;
```

Reduce rail font size, padding, row gap, sidebar width, route grid gap, section margins, header margin, and section padding while retaining at least 44px primary row targets.

- [ ] **Step 4: Verify GREEN**

Run the same focused tests and expect PASS.

### Task 6: Full verification and browser QA

**Files:**
- Modify only when verification exposes a task-scoped defect.

**Interfaces:**
- Consumes: the completed route and automated checks.
- Produces: verified dirty-branch handoff with no committed or pushed changes.

- [ ] **Step 1: Run formatting and lint**

Run:

```powershell
npm.cmd run prettier:check
npm.cmd run lint
npm.cmd run lint:css
```

- [ ] **Step 2: Run unit and build gates**

Run:

```powershell
npm.cmd run test-functions
npm.cmd run build
```

- [ ] **Step 3: Run the relevant Playwright route spec**

Run: `npm.cmd exec playwright test -- playwright/pages/sanderson-technology-enterprises.spec.ts`

- [ ] **Step 4: Run Browser QA**

Using the available Browser plugin, inspect 1440x900, 1024x1054, and 390x844. Verify page identity, meaningful content, no framework overlay, console health, both videos, all public links, natural navigation wrapping, and one expand/collapse interaction. Compare after screenshots to the supplied references and record intentional differences.

- [ ] **Step 5: Review the final diff**

Confirm source/destination video hashes match, dependency versions are exact, no unrelated dirty changes were overwritten, no generated reports or screenshots entered the repo, and `git diff --check` is clean.
