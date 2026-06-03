/**
 * @file favicon.js
 * @description Theme- and palette-aware favicon helpers for the portfolio.
 * @module assets/favicon
 */

export const FAVICON_THEME_MODE = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
  CONTRAST: "contrast",
};

export const FAVICON_PALETTES = {
  CLASSIC: "classic",
  MIDNIGHT_GOLD: "midnight-gold",
  OCEAN_STEEL: "ocean-steel",
  FOREST_MOSS: "forest-moss",
  SUNSET_EMBER: "sunset-ember",
  ROYAL_PLUM: "royal-plum",
  GRAPHITE_CYAN: "graphite-cyan",
  DESERT_SAGE: "desert-sage",
  ROSE_QUARTZ: "rose-quartz",
  CYBER_LIME: "cyber-lime",
  ARCTIC_INDIGO: "arctic-indigo",
};

const DEFAULT_FAVICON_PALETTE = FAVICON_PALETTES.OCEAN_STEEL;
const FAVICON_ID = "app-favicon";

const PALETTE_ALIASES = {
  classic: FAVICON_PALETTES.CLASSIC,
  primary: FAVICON_PALETTES.CLASSIC,

  midnight: FAVICON_PALETTES.MIDNIGHT_GOLD,
  "midnight-gold": FAVICON_PALETTES.MIDNIGHT_GOLD,

  ocean: FAVICON_PALETTES.OCEAN_STEEL,
  "ocean-steel": FAVICON_PALETTES.OCEAN_STEEL,

  forest: FAVICON_PALETTES.FOREST_MOSS,
  "forest-moss": FAVICON_PALETTES.FOREST_MOSS,

  sunset: FAVICON_PALETTES.SUNSET_EMBER,
  "sunset-ember": FAVICON_PALETTES.SUNSET_EMBER,

  amethyst: FAVICON_PALETTES.ROYAL_PLUM,
  alt: FAVICON_PALETTES.ROYAL_PLUM,
  "royal-plum": FAVICON_PALETTES.ROYAL_PLUM,

  cyan: FAVICON_PALETTES.GRAPHITE_CYAN,
  "graphite-cyan": FAVICON_PALETTES.GRAPHITE_CYAN,

  slate: FAVICON_PALETTES.DESERT_SAGE,
  "desert-sage": FAVICON_PALETTES.DESERT_SAGE,

  rose: FAVICON_PALETTES.ROSE_QUARTZ,
  "rose-quartz": FAVICON_PALETTES.ROSE_QUARTZ,

  "cyber-lime": FAVICON_PALETTES.CYBER_LIME,
  "arctic-indigo": FAVICON_PALETTES.ARCTIC_INDIGO,
};

const FAVICON_PATHS = {
  light: {
    [FAVICON_PALETTES.CLASSIC]: "/favicons/favicon-classic-light.png",
    [FAVICON_PALETTES.MIDNIGHT_GOLD]: "/favicons/favicon-midnight-gold-light.png",
    [FAVICON_PALETTES.OCEAN_STEEL]: "/favicons/favicon-ocean-steel-light.png",
    [FAVICON_PALETTES.FOREST_MOSS]: "/favicons/favicon-forest-moss-light.png",
    [FAVICON_PALETTES.SUNSET_EMBER]: "/favicons/favicon-sunset-ember-light.png",
    [FAVICON_PALETTES.ROYAL_PLUM]: "/favicons/favicon-royal-plum-light.png",
    [FAVICON_PALETTES.GRAPHITE_CYAN]: "/favicons/favicon-graphite-cyan-light.png",
    [FAVICON_PALETTES.DESERT_SAGE]: "/favicons/favicon-desert-sage-light.png",
    [FAVICON_PALETTES.ROSE_QUARTZ]: "/favicons/favicon-rose-quartz-light.png",
    [FAVICON_PALETTES.CYBER_LIME]: "/favicons/favicon-cyber-lime-light.png",
    [FAVICON_PALETTES.ARCTIC_INDIGO]: "/favicons/favicon-arctic-indigo-light.png",
  },
  dark: {
    [FAVICON_PALETTES.CLASSIC]: "/favicons/favicon-classic-dark.png",
    [FAVICON_PALETTES.MIDNIGHT_GOLD]: "/favicons/favicon-midnight-gold-dark.png",
    [FAVICON_PALETTES.OCEAN_STEEL]: "/favicons/favicon-ocean-steel-dark.png",
    [FAVICON_PALETTES.FOREST_MOSS]: "/favicons/favicon-forest-moss-dark.png",
    [FAVICON_PALETTES.SUNSET_EMBER]: "/favicons/favicon-sunset-ember-dark.png",
    [FAVICON_PALETTES.ROYAL_PLUM]: "/favicons/favicon-royal-plum-dark.png",
    [FAVICON_PALETTES.GRAPHITE_CYAN]: "/favicons/favicon-graphite-cyan-dark.png",
    [FAVICON_PALETTES.DESERT_SAGE]: "/favicons/favicon-desert-sage-dark.png",
    [FAVICON_PALETTES.ROSE_QUARTZ]: "/favicons/favicon-rose-quartz-dark.png",
    [FAVICON_PALETTES.CYBER_LIME]: "/favicons/favicon-cyber-lime-dark.png",
    [FAVICON_PALETTES.ARCTIC_INDIGO]: "/favicons/favicon-arctic-indigo-dark.png",
  },
};

export function getSystemTheme() {
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return FAVICON_THEME_MODE.DARK;
  }

  return FAVICON_THEME_MODE.LIGHT;
}

export function getDocumentPalette() {
  if (typeof document === "undefined") return DEFAULT_FAVICON_PALETTE;

  return document.documentElement?.dataset?.palette || DEFAULT_FAVICON_PALETTE;
}

export function resolvePalette(palette = DEFAULT_FAVICON_PALETTE) {
  const normalized = String(palette || "")
    .trim()
    .toLowerCase();

  return PALETTE_ALIASES[normalized] || DEFAULT_FAVICON_PALETTE;
}

export function resolveFaviconTheme(themeMode = FAVICON_THEME_MODE.AUTO) {
  if (themeMode === FAVICON_THEME_MODE.LIGHT) return FAVICON_THEME_MODE.LIGHT;
  if (themeMode === FAVICON_THEME_MODE.DARK) return FAVICON_THEME_MODE.DARK;
  if (themeMode === FAVICON_THEME_MODE.CONTRAST) return FAVICON_THEME_MODE.DARK;

  return getSystemTheme();
}

function getOrCreateFaviconLink() {
  if (typeof document === "undefined") return null;

  let link = document.getElementById(FAVICON_ID);

  if (link instanceof HTMLLinkElement) {
    return link;
  }

  link = document.createElement("link");
  link.id = FAVICON_ID;
  link.rel = "icon";
  link.type = "image/png";
  document.head.appendChild(link);

  return link;
}

function pruneCompetingFaviconLinks(canonicalLink) {
  if (typeof document === "undefined" || !canonicalLink) return;

  document.head.querySelectorAll('link[rel~="icon"]').forEach((node) => {
    if (node instanceof HTMLLinkElement && node !== canonicalLink) {
      node.remove();
    }
  });
}

export function getFaviconPath(themeMode = FAVICON_THEME_MODE.AUTO, palette) {
  const resolvedTheme = resolveFaviconTheme(themeMode);
  const resolvedPalette = resolvePalette(palette || getDocumentPalette());

  return (
    FAVICON_PATHS[resolvedTheme]?.[resolvedPalette] || FAVICON_PATHS.dark[DEFAULT_FAVICON_PALETTE]
  );
}

export function updateFavicon(themeMode = FAVICON_THEME_MODE.AUTO, palette) {
  const link = getOrCreateFaviconLink();

  if (!link) return;

  link.rel = "icon";
  link.type = "image/png";
  link.href = getFaviconPath(themeMode, palette);
  pruneCompetingFaviconLinks(link);
}

export function subscribeToSystemThemeChanges(onChange) {
  if (typeof window === "undefined" || !window.matchMedia || typeof onChange !== "function") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => onChange();

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }

  if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }

  return () => {};
}

export function subscribeToPaletteChanges(onChange) {
  if (typeof document === "undefined" || typeof onChange !== "function") {
    return () => {};
  }

  const root = document.documentElement;

  if (typeof MutationObserver === "undefined") {
    return () => {};
  }

  const observer = new MutationObserver((mutations) => {
    const paletteChanged = mutations.some(
      (mutation) => mutation.type === "attributes" && mutation.attributeName === "data-palette"
    );

    if (paletteChanged) {
      onChange();
    }
  });

  observer.observe(root, {
    attributes: true,
    attributeFilter: ["data-palette"],
  });

  return () => observer.disconnect();
}
