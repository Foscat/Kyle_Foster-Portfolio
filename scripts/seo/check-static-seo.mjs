/**
 * @file check-static-seo.mjs
 * @description CLI entrypoint for validating generated static SEO artifacts.
 * @module scripts/seo/check-static-seo
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateSeoArtifacts } from "./static-seo.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDir, "../..");
const distDir = path.join(repositoryRoot, "dist");
const siteOrigin = (process.env.VITE_SITE_URL || "https://kyle-foster.com").replace(/\/+$/u, "");

await validateSeoArtifacts({ distDir, siteOrigin });

console.log(`Validated static SEO route shells for ${siteOrigin}.`);
