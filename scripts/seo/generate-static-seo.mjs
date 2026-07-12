/**
 * @file generate-static-seo.mjs
 * @description CLI entrypoint that generates and immediately validates static SEO artifacts.
 * @module scripts/seo/generate-static-seo
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateSeoArtifacts, validateSeoArtifacts } from "./static-seo.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDir, "../..");
const distDir = path.join(repositoryRoot, "dist");
const siteOrigin = (process.env.VITE_SITE_URL || "https://kyle-foster.com").replace(/\/+$/u, "");

await generateSeoArtifacts({ distDir, siteOrigin });
await validateSeoArtifacts({ distDir, siteOrigin });

console.log(`Generated static SEO route shells for ${siteOrigin}.`);
