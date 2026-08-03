# STE Interface and Product Showcase Design

## Objective

Tighten the portfolio UI so section navigation never splits ordinary words, spacing stays compact across desktop and mobile layouts, and the Sanderson Technology Enterprises case study presents its two public product lines and four interface libraries as working, linked experiences.

## Approved Direction

Replace the generic White-Label Product Platform section with a focused Content Creator Platform section. Keep the reusable white-label architecture story in the overview and product copy, but give Content Creator Platform and Scrap Yard System equal treatment: concise positioning, an accessible self-hosted promo video, and a direct link to the corresponding public STE product page.

## Navigation and Spacing

- Keep full section titles in page headings, but provide compact navigation labels such as `Content Creator`, `Scrap Yard`, and `Interface System`.
- Move the desktop section rail breakpoint from 1024px to 1200px so tablet and narrow desktop layouts use the compact mobile trigger instead of squeezing content between two navigation rails.
- Prevent arbitrary word splitting with normal word-breaking, disabled hyphenation, and balanced wrapping at spaces.
- Reduce sidebar padding, row padding, font size, layout gap, and section padding while retaining accessible target sizes and visible focus states.
- Apply the section-navigation fix across case-study routes because the screenshots show the same shared component breaking CodeStream and other section names.

## Product Media

- Copy the two approved source MP4 files byte-for-byte into `src/assets/videos/ste/`.
- Render native `<video>` controls with `playsInline`, `preload="metadata"`, no autoplay, and a descriptive accessible label.
- Use one reusable `VIDEO` content block so product media remains declarative and testable through the existing section renderer.
- Keep video sizing responsive with a 16:9 frame, `object-fit: contain`, rounded shared surfaces, and a compact caption.

## Interface System

- Upgrade `ui-style-kit-css` to 2.1.0, `ui-style-kit-icons` to 1.0.0, `layout-style-css` to 3.0.0, and `interactive-surface-css` to 1.5.0.
- Load the packages in ownership order: UI paint, interaction states, layout primitives, icon CSS/runtime, then app-specific composition.
- Extend interface-system cards to support semantic `<usk-icon>` elements while preserving Font Awesome fallback support elsewhere.
- Show four coordinated layers: Layout Style CSS, UI Style Kit CSS, UI Style Kit Icons, and Interactive Surface CSS.
- Link each library card to its public documentation or demo destination and keep Interface Systems Lab as the integration proof.
- Update the Mermaid interface-system flow to include the icon layer.

## Public Links

- Scrap Yard System: `https://sandersontechnologyenterprises.com/scrap-yard-system.html`
- Content Creator Platform: `https://sandersontechnologyenterprises.com/content-creator-platform.html`
- UI Style Kit Icons: `https://foscat.github.io/ui-style-kit-css-icons/`
- Preserve the existing public STE site, Interface Systems Lab, repository, and portfolio-side ecosystem links.

## Verification

- Unit tests protect video semantics, renderer dispatch, focused product content, public URLs, icon rendering, and the four-library contract.
- CSS contract tests protect the 1200px breakpoint and no-mid-word wrapping behavior.
- Browser QA covers 1440x900, 1024x1054, and 390x844, including product video visibility, product links, section navigation, one expand/collapse interaction, console health, and visual comparison against the supplied screenshots.
- Full formatting, lint, unit, build, and relevant Playwright checks must pass before handoff.

