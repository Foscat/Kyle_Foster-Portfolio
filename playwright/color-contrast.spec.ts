/**
 * @file playwright/color-contrast.spec.ts
 * @description Rendered contrast checks for UI style switching and Mermaid diagrams.
 * @module playwright/color-contrast
 */

import { expect, test, type Page } from "@playwright/test";
import { PALETTE_IDS, PALETTE_TOKENS } from "../src/assets/themePalettes.js";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";
import { waitForMermaidRender } from "./utils/waitForMermaid";

type Theme = "light" | "dark";
type StyleKitMode = Theme | "contrast";

const UI_STYLES = [
  "minimal-saas",
  "bento",
  "maximalist",
  "bauhaus",
  "tactile",
  "neumorphism",
  "retrofuturism",
  "brutalism",
  "cyberpunk",
  "y2k",
  "retro-glass",
] as const;
const STYLE_KIT_MODES: StyleKitMode[] = ["light", "dark", "contrast"];

const AUDIT_CASES = [
  {
    name: "side project Mermaid in light cyberpunk",
    route: "/side-projects",
    theme: "light" as Theme,
    palette: "cyber-lime",
    uiStyle: "cyberpunk",
    diagramId: "diagram-greenhouse-mental-model",
  },
  {
    name: "CodeStream Mermaid in dark brutalism",
    route: "/codestream",
    theme: "dark" as Theme,
    palette: "ocean-steel",
    uiStyle: "brutalism",
    diagramId: "diagram-organization-license-model",
  },
  {
    name: "CodeStream Mermaid in dark cyber-lime cyberpunk",
    route: "/codestream",
    theme: "dark" as Theme,
    palette: "cyber-lime",
    uiStyle: "cyberpunk",
    diagramId: "diagram-organization-license-model",
    scrollToBackToTop: true,
  },
  {
    name: "side project Mermaid in dark cyber-lime retrofuturism",
    route: "/side-projects",
    theme: "dark" as Theme,
    palette: "cyber-lime",
    uiStyle: "retrofuturism",
    diagramId: "diagram-greenhouse-mental-model",
    scrollToBackToTop: true,
  },
  {
    name: "color menu in light Y2K",
    route: "/",
    theme: "light" as Theme,
    palette: "rose-quartz",
    uiStyle: "y2k",
    openColorMenu: true,
  },
];

async function prepareStyledPage(
  page: Page,
  {
    theme,
    palette,
    uiStyle,
  }: {
    theme: Theme;
    palette: string;
    uiStyle: string;
  }
) {
  await preparePageForStableTests(page, { theme });
  await page.addInitScript(
    (state) => {
      try {
        window.localStorage.setItem("portfolio-theme", state.theme);
        window.localStorage.setItem("portfolio-palette", state.palette);
        window.localStorage.setItem("portfolio-ui-style", state.uiStyle);
      } catch {
        // Ignore hardened storage.
      }
    },
    { theme, palette, uiStyle }
  );
}

async function syncStyleAttributes(page: Page, theme: Theme, palette: string, uiStyle: string) {
  await page.evaluate(
    (state) => {
      document.documentElement.dataset.theme = state.theme;
      document.documentElement.dataset.mode = state.theme;
      document.documentElement.dataset.palette = state.palette;
      document.documentElement.dataset.ui = state.uiStyle;

      document.body.dataset.ui = state.uiStyle;
      document.body.dataset.theme = state.palette;
      document.body.dataset.mode = state.theme;
    },
    { theme, palette, uiStyle }
  );

  await expect.poll(() => page.evaluate(() => document.body.dataset.ui || "")).toBe(uiStyle);
}

async function collectContrastFailures(page: Page) {
  return page.evaluate(() => {
    const MIN_TEXT_CONTRAST = 4.5;
    const MAX_FAILURES = 20;

    type Rgba = { r: number; g: number; b: number; a: number };

    function parseColor(value: string | null): Rgba | null {
      if (!value) return null;

      const color = value.trim().toLowerCase();
      if (!color || color === "none" || color === "transparent") return null;

      const srgbMatch = color.match(
        /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/
      );
      if (srgbMatch) {
        const [, r, g, b, a = "1"] = srgbMatch;
        return {
          r: Number(r) * 255,
          g: Number(g) * 255,
          b: Number(b) * 255,
          a: Number(a),
        };
      }

      const rgbMatch = color.match(/^rgba?\((.+)\)$/);
      if (rgbMatch) {
        const parts = rgbMatch[1]
          .replace(/\//g, " ")
          .split(/[,\s]+/)
          .map((part) => part.trim())
          .filter(Boolean);
        const [r, g, b, a = "1"] = parts;
        if (r === undefined || g === undefined || b === undefined) return null;

        return {
          r: Number.parseFloat(r),
          g: Number.parseFloat(g),
          b: Number.parseFloat(b),
          a: Number.parseFloat(a),
        };
      }

      const hexMatch = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
      if (hexMatch) {
        const hex = hexMatch[1];
        const normalized =
          hex.length === 3
            ? hex
                .split("")
                .map((char) => char + char)
                .join("")
            : hex;
        return {
          r: Number.parseInt(normalized.slice(0, 2), 16),
          g: Number.parseInt(normalized.slice(2, 4), 16),
          b: Number.parseInt(normalized.slice(4, 6), 16),
          a: 1,
        };
      }

      return null;
    }

    function blend(foreground: Rgba, background: Rgba): Rgba {
      const alpha = Math.max(0, Math.min(1, foreground.a));
      return {
        r: foreground.r * alpha + background.r * (1 - alpha),
        g: foreground.g * alpha + background.g * (1 - alpha),
        b: foreground.b * alpha + background.b * (1 - alpha),
        a: 1,
      };
    }

    function linearize(channel: number) {
      const normalized = channel / 255;
      return normalized <= 0.04045
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    }

    function luminance(color: Rgba) {
      return (
        0.2126 * linearize(color.r) + 0.7152 * linearize(color.g) + 0.0722 * linearize(color.b)
      );
    }

    function contrastRatio(foreground: Rgba, background: Rgba) {
      const l1 = luminance(foreground);
      const l2 = luminance(background);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    function isVisible(el: Element) {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        Number.parseFloat(style.opacity || "1") > 0
      );
    }

    function elementLabel(el: Element) {
      const id = el.id ? `#${el.id}` : "";
      const className =
        typeof (el as HTMLElement).className === "string"
          ? `.${(el as HTMLElement).className.trim().split(/\s+/).slice(0, 3).join(".")}`
          : "";
      return `${el.tagName.toLowerCase()}${id}${className}`;
    }

    function colorToString(color: Rgba) {
      return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
    }

    function getPageBackground() {
      const bodyBg = parseColor(window.getComputedStyle(document.body).backgroundColor);
      const rootBg = parseColor(window.getComputedStyle(document.documentElement).backgroundColor);
      return bodyBg && bodyBg.a > 0
        ? bodyBg
        : rootBg && rootBg.a > 0
          ? rootBg
          : { r: 255, g: 255, b: 255, a: 1 };
    }

    function getAncestorBackground(el: Element) {
      let background = getPageBackground();
      const chain: Element[] = [];
      let current: Element | null = el;

      while (current) {
        chain.push(current);
        current = current.parentElement;
      }

      for (const node of chain.reverse()) {
        const color = parseColor(window.getComputedStyle(node).backgroundColor);
        if (color && color.a > 0) {
          background = blend(color, background);
        }
      }

      return background;
    }

    function getSvgNodeBackground(el: Element) {
      const node = el.closest("g.node");
      const shape = node?.querySelector("rect, polygon, circle, ellipse");
      if (!shape) return null;

      const fill = parseColor(window.getComputedStyle(shape).fill);
      if (!fill || fill.a === 0) return null;

      return blend(fill, getAncestorBackground(shape));
    }

    function getForeground(el: Element) {
      const style = window.getComputedStyle(el);
      const fill = parseColor(style.fill);
      const color = parseColor(style.color);

      if (el instanceof SVGElement && fill && fill.a > 0) {
        return fill;
      }

      return color && color.a > 0 ? color : fill;
    }

    function getIconForeground(el: Element) {
      const icon = el.querySelector(
        "svg :is(path, circle, rect, polygon, polyline, line, ellipse)"
      );
      if (!icon) return null;

      const style = window.getComputedStyle(icon);
      const stroke = parseColor(style.stroke);
      const fill = parseColor(style.fill);
      const color = parseColor(window.getComputedStyle(el).color);

      if (stroke && stroke.a > 0) return stroke;
      if (fill && fill.a > 0) return fill;
      return color && color.a > 0 ? color : null;
    }

    function getBackground(el: Element) {
      return getSvgNodeBackground(el) || getAncestorBackground(el);
    }

    const selector = [
      ".glass-card :is(h1, h2, h3, h4, h5, h6, p, li, a, button)",
      ".blue-tile :is(h1, h2, h3, h4, h5, h6, p, li, a, button)",
      ".frosted :is(h1, h2, h3, h4, h5, h6, p, li, a, button)",
      ".color-modal :is(h1, h2, h3, h4, h5, h6, p, label, button, select)",
      ".interactive-surface",
      ".back-to-top__button",
      ".mermaid foreignObject :is(p, span, div)",
      ".mermaid text",
      ".mermaid tspan",
    ].join(", ");

    const candidates = Array.from(document.querySelectorAll(selector));
    const failures = [];

    for (const el of candidates) {
      const text = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!isVisible(el)) continue;

      const foreground = text ? getForeground(el) : getIconForeground(el);
      const background = getBackground(el);
      if (!foreground || !background) continue;

      const ratio = contrastRatio(blend(foreground, background), background);
      if (ratio < MIN_TEXT_CONTRAST) {
        failures.push({
          element: elementLabel(el),
          text: text.slice(0, 80) || (el.getAttribute("aria-label") ?? "[icon-only]"),
          ratio: Number(ratio.toFixed(2)),
          foreground: colorToString(foreground),
          background: colorToString(background),
        });
      }

      if (failures.length >= MAX_FAILURES) break;
    }

    return failures;
  });
}

test.describe("Rendered color contrast", () => {
  test("keeps semantic app surfaces and controls readable for every palette, UI style, and style-kit mode", async ({
    page,
  }) => {
    test.setTimeout(60_000);

    await page.setViewportSize({ width: 390, height: 844 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto("/");
    await stabilizePage(page, { theme: "dark" });

    const failures = await page.evaluate(
      ({ modes, palettes, tokensByPalette, uiStyles }) => {
        const MIN_TEXT_CONTRAST = 4.5;
        const MAX_FAILURES = 60;

        type Rgba = { r: number; g: number; b: number; a: number };

        function parseColor(value: string | null): Rgba | null {
          if (!value) return null;

          const color = value.trim().toLowerCase();
          if (!color || color === "none" || color === "transparent") return null;

          const srgbMatch = color.match(
            /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/
          );
          if (srgbMatch) {
            const [, r, g, b, a = "1"] = srgbMatch;
            return {
              r: Number(r) * 255,
              g: Number(g) * 255,
              b: Number(b) * 255,
              a: Number(a),
            };
          }

          const rgbMatch = color.match(/^rgba?\((.+)\)$/);
          if (rgbMatch) {
            const parts = rgbMatch[1]
              .replace(/\//g, " ")
              .split(/[,\s]+/)
              .map((part) => part.trim())
              .filter(Boolean);
            const [r, g, b, a = "1"] = parts;
            if (r === undefined || g === undefined || b === undefined) return null;

            return {
              r: Number.parseFloat(r),
              g: Number.parseFloat(g),
              b: Number.parseFloat(b),
              a: Number.parseFloat(a),
            };
          }

          const hexMatch = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
          if (hexMatch) {
            const hex = hexMatch[1];
            const normalized =
              hex.length === 3
                ? hex
                    .split("")
                    .map((char) => char + char)
                    .join("")
                : hex;
            return {
              r: Number.parseInt(normalized.slice(0, 2), 16),
              g: Number.parseInt(normalized.slice(2, 4), 16),
              b: Number.parseInt(normalized.slice(4, 6), 16),
              a: 1,
            };
          }

          return null;
        }

        function blend(foreground: Rgba, background: Rgba): Rgba {
          const alpha = Math.max(0, Math.min(1, foreground.a));
          return {
            r: foreground.r * alpha + background.r * (1 - alpha),
            g: foreground.g * alpha + background.g * (1 - alpha),
            b: foreground.b * alpha + background.b * (1 - alpha),
            a: 1,
          };
        }

        function linearize(channel: number) {
          const normalized = channel / 255;
          return normalized <= 0.04045
            ? normalized / 12.92
            : Math.pow((normalized + 0.055) / 1.055, 2.4);
        }

        function luminance(color: Rgba) {
          return (
            0.2126 * linearize(color.r) + 0.7152 * linearize(color.g) + 0.0722 * linearize(color.b)
          );
        }

        function contrastRatio(foreground: Rgba, background: Rgba) {
          const l1 = luminance(foreground);
          const l2 = luminance(background);
          const lighter = Math.max(l1, l2);
          const darker = Math.min(l1, l2);
          return (lighter + 0.05) / (darker + 0.05);
        }

        function resolveBackground(background: Rgba, pageBackground: Rgba) {
          return background.a < 1 ? blend(background, pageBackground) : background;
        }

        function colorToString(color: Rgba) {
          return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
        }

        function makeProbe(
          label: string,
          background: string,
          color: string,
          parent = document.body
        ) {
          const probe = document.createElement("div");
          probe.dataset.probe = label;
          probe.textContent = label;
          probe.style.position = "fixed";
          probe.style.left = "-9999px";
          probe.style.top = "0";
          probe.style.width = "240px";
          probe.style.height = "48px";
          probe.style.background = background;
          probe.style.color = color;
          parent.append(probe);
          return probe;
        }

        const desktopMenu = document.createElement("div");
        desktopMenu.className = "desktop-menu";
        desktopMenu.style.position = "fixed";
        desktopMenu.style.left = "-9999px";
        desktopMenu.style.top = "0";
        document.body.append(desktopMenu);

        const probes = [
          makeProbe("body", "var(--ui-kit-bg)", "var(--app-surface-fg)"),
          makeProbe("surface", "var(--app-surface-bg)", "var(--app-surface-readable-fg)"),
          makeProbe(
            "surface-muted",
            "var(--app-surface-muted-bg)",
            "var(--app-surface-readable-muted-fg)"
          ),
          makeProbe(
            "surface-strong",
            "var(--app-surface-strong-bg)",
            "var(--app-surface-readable-fg)"
          ),
          makeProbe(
            "interactive",
            "var(--interactive-surface-bg)",
            "var(--interactive-surface-fg)"
          ),
          makeProbe(
            "control-on-page",
            "var(--ui-kit-bg)",
            "var(--app-kit-control-fg, var(--app-surface-readable-fg))"
          ),
          makeProbe(
            "sticky-nav-trigger-nav-on-page",
            "var(--ui-kit-bg)",
            "var(--sticky-nav-trigger-navigation-icon-color)"
          ),
          makeProbe(
            "sticky-nav-trigger-utility-on-page",
            "var(--ui-kit-bg)",
            "var(--sticky-nav-trigger-utility-icon-color)"
          ),
          makeProbe(
            "desktop-nav-page-icon",
            "var(--glass-bg)",
            "var(--sticky-nav-desktop-page-icon-color)",
            desktopMenu
          ),
          makeProbe(
            "desktop-nav-theme-icon",
            "var(--glass-bg)",
            "var(--sticky-nav-desktop-theme-icon-color)",
            desktopMenu
          ),
          makeProbe(
            "desktop-nav-a11y-icon",
            "var(--glass-bg)",
            "var(--sticky-nav-desktop-a11y-icon-color)",
            desktopMenu
          ),
          makeProbe(
            "desktop-nav-resume-icon",
            "var(--glass-bg)",
            "var(--sticky-nav-desktop-resume-icon-color)",
            desktopMenu
          ),
          makeProbe(
            "mobile-nav-icon",
            "var(--sticky-nav-mobile-trigger-backplate-bg)",
            "var(--sticky-nav-mobile-stack-nav-icon-color)"
          ),
          makeProbe(
            "mobile-utility-icon",
            "var(--sticky-nav-mobile-trigger-backplate-bg)",
            "var(--sticky-nav-mobile-stack-utility-icon-color)"
          ),
        ];
        const failures = [];
        const root = document.documentElement;

        for (const palette of palettes) {
          for (const mode of modes) {
            const modeTokens = tokensByPalette[palette]?.[mode];
            if (!modeTokens) {
              failures.push(`${palette}/${mode} missing palette tokens`);
              continue;
            }

            for (const [key, value] of Object.entries(modeTokens)) {
              root.style.setProperty(`--${key}`, String(value));
            }

            root.dataset.theme = mode === "light" ? "light" : "dark";
            root.dataset.mode = mode;
            root.dataset.palette = palette;
            root.dataset.a11yHighContrast = mode === "contrast" ? "true" : "false";

            document.body.dataset.theme = palette;
            document.body.dataset.mode = mode;

            for (const uiStyle of uiStyles) {
              root.dataset.ui = uiStyle;
              document.body.dataset.ui = uiStyle;

              // Force style recalc before sampling computed color values.
              void document.body.offsetHeight;
              const pageBackground = parseColor(
                window.getComputedStyle(probes[0]).backgroundColor
              ) ?? {
                r: 255,
                g: 255,
                b: 255,
                a: 1,
              };

              for (const probe of probes) {
                const style = window.getComputedStyle(probe);
                const foreground = parseColor(style.color);
                const rawBackground = parseColor(style.backgroundColor);

                if (!foreground || !rawBackground) {
                  failures.push(
                    `${palette}/${mode}/${uiStyle}/${probe.dataset.probe} unresolved color foreground=${style.color} background=${style.backgroundColor}`
                  );
                  continue;
                }

                const background = resolveBackground(rawBackground, pageBackground);
                const ratio = contrastRatio(blend(foreground, background), background);
                if (ratio < MIN_TEXT_CONTRAST) {
                  failures.push(
                    `${palette}/${mode}/${uiStyle}/${probe.dataset.probe} ${ratio.toFixed(
                      2
                    )} < ${MIN_TEXT_CONTRAST} foreground=${colorToString(
                      foreground
                    )} background=${colorToString(background)}`
                  );
                }

                if (failures.length >= MAX_FAILURES) break;
              }

              if (failures.length >= MAX_FAILURES) break;
            }

            if (failures.length >= MAX_FAILURES) break;
          }

          if (failures.length >= MAX_FAILURES) break;
        }

        probes.forEach((probe) => probe.remove());
        desktopMenu.remove();

        return failures;
      },
      {
        modes: STYLE_KIT_MODES,
        palettes: PALETTE_IDS,
        tokensByPalette: PALETTE_TOKENS,
        uiStyles: UI_STYLES,
      }
    );

    expect(failures, failures.join("\n")).toEqual([]);
  });

  for (const auditCase of AUDIT_CASES) {
    test(`${auditCase.name} keeps visible foregrounds readable`, async ({ page }) => {
      test.setTimeout(60_000);

      await page.setViewportSize({ width: 1366, height: 900 });
      await prepareStyledPage(page, auditCase);
      await page.goto(auditCase.route);
      await stabilizePage(page, { theme: auditCase.theme });
      await syncStyleAttributes(page, auditCase.theme, auditCase.palette, auditCase.uiStyle);

      if (auditCase.diagramId) {
        await page.locator(`#${auditCase.diagramId}`).scrollIntoViewIfNeeded();
        await waitForMermaidRender(page, auditCase.diagramId);
      }

      if (auditCase.scrollToBackToTop) {
        await page.evaluate(() => {
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "auto" });
        });
        await expect(page.getByRole("button", { name: /back to top/i })).toBeVisible();
      }

      if (auditCase.openColorMenu) {
        await page
          .getByRole("button", { name: /open color settings/i })
          .first()
          .click();
        await expect(page.getByRole("dialog", { name: /color settings/i })).toBeVisible();
      }

      const failures = await collectContrastFailures(page);
      expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
    });
  }
});
