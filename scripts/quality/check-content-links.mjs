/**
 * @file check-content-links.mjs
 * @description On-demand external-link verification with conservative anti-bot handling.
 * @module scripts/quality/check-content-links
 */

import { pathToFileURL } from "node:url";

const SUCCESS_MIN = 200;
const SUCCESS_MAX = 399;
const FALLBACK_STATUSES = new Set([403, 405, 501]);
const ANTI_BOT_STATUSES = new Set([401, 403, 429, 999]);
const URL_KEYS = new Set(["href", "liveUrl", "repo", "repoUrl", "url"]);

/**
 * Validate that a destination is already-normalized HTTP(S).
 * @param {string} value Candidate URL.
 * @returns {string} Validated URL.
 */
export const normalizeExternalUrl = (value) => {
  if (typeof value !== "string" || value !== value.trim()) {
    throw new Error("External URLs must be nonempty and normalized without surrounding spaces.");
  }

  const parsed = new URL(value);
  if (!new Set(["http:", "https:"]).has(parsed.protocol)) {
    throw new Error("External destinations must use HTTP(S).");
  }

  return parsed.href;
};

/**
 * Convert an npm package page into its authoritative registry endpoint.
 * @param {string} value npm package-page URL.
 * @returns {string|null} Registry URL when the destination is a package page.
 */
export const getNpmRegistryUrl = (value) => {
  const parsed = new URL(value);
  if (!new Set(["npmjs.com", "www.npmjs.com"]).has(parsed.hostname)) return null;

  const match = parsed.pathname.match(/^\/package\/(.+?)\/?$/u);
  if (!match) return null;

  return `https://registry.npmjs.org/${encodeURIComponent(decodeURIComponent(match[1]))}/latest`;
};

const isSuccessful = (status) => status >= SUCCESS_MIN && status <= SUCCESS_MAX;
const isAntiBotDestination = (value) => {
  const hostname = new URL(value).hostname;
  return hostname === "linkedin.com" || hostname.endsWith(".linkedin.com");
};

const request = async (url, method, fetchImpl, timeoutMs) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetchImpl(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "Kyle-Foster-Portfolio-Link-Check/1.0" },
    });
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Probe one external URL without treating common anti-bot behavior as a broken link.
 * @param {string} value Destination to verify.
 * @param {object} [options] Request controls used by the CLI and unit tests.
 * @param {typeof fetch} [options.fetchImpl] Fetch implementation.
 * @param {number} [options.timeoutMs] Per-request timeout.
 * @returns {Promise<object>} Classified probe result.
 */
export const probeExternalUrl = async (value, { fetchImpl = fetch, timeoutMs = 12_000 } = {}) => {
  const url = normalizeExternalUrl(value);

  try {
    const head = await request(url, "HEAD", fetchImpl, timeoutMs);
    if (isSuccessful(head.status)) return { url, outcome: "ok", status: head.status };

    const registryUrl = getNpmRegistryUrl(url);
    if (registryUrl && ANTI_BOT_STATUSES.has(head.status)) {
      const registry = await request(registryUrl, "GET", fetchImpl, timeoutMs);
      if (isSuccessful(registry.status)) {
        return {
          url,
          outcome: "ok",
          status: registry.status,
          confirmedBy: "npm-registry",
        };
      }
      return { url, outcome: "inconclusive", status: registry.status };
    }

    if (FALLBACK_STATUSES.has(head.status)) {
      const get = await request(url, "GET", fetchImpl, timeoutMs);
      if (isSuccessful(get.status)) return { url, outcome: "ok", status: get.status };
      if (isAntiBotDestination(url) && ANTI_BOT_STATUSES.has(get.status)) {
        return { url, outcome: "inconclusive", status: get.status };
      }
      return { url, outcome: "broken", status: get.status };
    }

    if (isAntiBotDestination(url) && ANTI_BOT_STATUSES.has(head.status)) {
      return { url, outcome: "inconclusive", status: head.status };
    }

    return { url, outcome: "broken", status: head.status };
  } catch (error) {
    return { url, outcome: "inconclusive", error: error.message };
  }
};

const collectExternalUrls = (value, urls = new Set(), key = "") => {
  if (typeof value === "string") {
    if (URL_KEYS.has(key) && /^https?:\/\//u.test(value)) urls.add(normalizeExternalUrl(value));
    return urls;
  }
  if (!value || typeof value !== "object") return urls;
  if (Array.isArray(value)) value.forEach((entry) => collectExternalUrls(entry, urls, key));
  else {
    Object.entries(value).forEach(([entryKey, entry]) =>
      collectExternalUrls(entry, urls, entryKey)
    );
  }
  return urls;
};

/**
 * @description Run the repository's optional external-link audit.
 * @returns {Promise<void>}
 */
export const runExternalLinkAudit = async () => {
  const { createServer } = await import("vite");
  const server = await createServer({
    appType: "custom",
    logLevel: "error",
    server: { middlewareMode: true },
  });

  try {
    const [content, projectMetas, pageSummaryMetas] = await Promise.all([
      server.ssrLoadModule("/src/assets/data/content/index.js"),
      server.ssrLoadModule("/src/assets/data/projectMetas.js"),
      server.ssrLoadModule("/src/assets/data/pageSummaryMetas.js"),
    ]);
    const urls = [...collectExternalUrls({ content, projectMetas, pageSummaryMetas })].sort();
    const results = [];

    for (const url of urls) {
      // Sequential requests are deliberate so the audit remains courteous to third-party hosts.
      results.push(await probeExternalUrl(url));
    }

    results.forEach((result) => {
      const detail = result.confirmedBy || result.status || result.error || "no response";
      process.stdout.write(`${result.outcome.padEnd(12)} ${result.url} (${detail})\n`);
    });

    const broken = results.filter(({ outcome }) => outcome === "broken");
    const inconclusive = results.filter(({ outcome }) => outcome === "inconclusive");
    process.stdout.write(
      `Checked ${results.length} external links: ${broken.length} broken, ${inconclusive.length} inconclusive.\n`
    );
    if (broken.length) process.exitCode = 1;
  } finally {
    await server.close();
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runExternalLinkAudit();
}
