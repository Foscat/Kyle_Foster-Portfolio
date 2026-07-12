/**
 * @file check-content-links.node-test.mjs
 * @description Unit contracts for the optional external-link verifier.
 * @module scripts/quality/check-content-links.node-test
 */

import assert from "node:assert/strict";
import test from "node:test";
import {
  getNpmRegistryUrl,
  normalizeExternalUrl,
  probeExternalUrl,
} from "./check-content-links.mjs";

test("normalizeExternalUrl accepts only normalized HTTP(S) destinations", () => {
  assert.equal(normalizeExternalUrl("https://example.com/path"), "https://example.com/path");
  assert.throws(() => normalizeExternalUrl(" https://example.com/path"), /normalized/u);
  assert.throws(() => normalizeExternalUrl("mailto:test@example.com"), /HTTP\(S\)/u);
});

test("probeExternalUrl falls back from HEAD to GET", async () => {
  const methods = [];
  const fetchImpl = async (_url, options) => {
    methods.push(options.method);
    return { status: options.method === "HEAD" ? 405 : 200 };
  };

  const result = await probeExternalUrl("https://example.com/resource", { fetchImpl });

  assert.equal(result.outcome, "ok");
  assert.deepEqual(methods, ["HEAD", "GET"]);
});

test("npm package pages are confirmed through the registry after anti-bot responses", async () => {
  const requests = [];
  const fetchImpl = async (url, options) => {
    requests.push({ url, method: options.method });
    const parsedUrl = new URL(url);
    return { status: parsedUrl.hostname === "registry.npmjs.org" ? 200 : 403 };
  };

  assert.equal(
    getNpmRegistryUrl("https://www.npmjs.com/package/@scope/example"),
    "https://registry.npmjs.org/%40scope%2Fexample/latest"
  );
  const result = await probeExternalUrl("https://www.npmjs.com/package/@scope/example", {
    fetchImpl,
  });

  assert.equal(result.outcome, "ok");
  assert.equal(result.confirmedBy, "npm-registry");
  assert.equal(requests.at(-1).method, "GET");
});

test("LinkedIn anti-bot responses remain inconclusive", async () => {
  const result = await probeExternalUrl("https://www.linkedin.com/in/example", {
    fetchImpl: async () => ({ status: 999 }),
  });

  assert.equal(result.outcome, "inconclusive");
});
