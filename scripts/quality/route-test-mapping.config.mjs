/**
 * @file scripts/quality/route-test-mapping.config.mjs
 * @description Explicit route-to-test mapping for active App routes.
 * @module scripts/quality/route-test-mapping.config
 */

/**
 * @typedef {Object} RouteTestFileRef
 * @property {string} file - Repo-relative test file path.
 * @property {string[]} [mustInclude] - Source snippets that must be present.
 */

/**
 * @typedef {Object} RouteTestMappingEntry
 * @property {RouteTestFileRef[]} vitest - Direct unit/integration tests for a route.
 * @property {RouteTestFileRef[]} playwright - Direct Playwright tests for a route.
 */

/**
 * @type {Readonly<Record<string, RouteTestMappingEntry>>}
 */
export const ROUTE_TEST_MAPPING = Object.freeze({
  "/": {
    vitest: [{ file: "src/pages/Home/Home.test.jsx", mustInclude: ["pageRoute: PageRoute.HOME"] }],
    playwright: [
      { file: "playwright/pages/home.spec.ts", mustInclude: ['route: "/"'] },
      {
        file: "playwright/accessibility.routes.spec.ts",
        mustInclude: ['route: "/"', 'name: "Home"'],
      },
      {
        file: "playwright/performance.route-budgets.spec.ts",
        mustInclude: ['{ route: "/", name: "Home",'],
      },
      {
        file: "playwright/dev-runtime.smoke.spec.ts",
        mustInclude: ['{ route: "/", label: "Home" }'],
      },
    ],
  },
  "/codestream": {
    vitest: [
      {
        file: "src/pages/__tests__/CodeStream.test.jsx",
        mustInclude: ["pageRoute: PageRoute.CODE_STREAM"],
      },
    ],
    playwright: [
      { file: "playwright/pages/codestream.spec.ts", mustInclude: ['route: "/codestream"'] },
      {
        file: "playwright/accessibility.routes.spec.ts",
        mustInclude: ['route: "/codestream"', 'name: "CodeStream"'],
      },
      {
        file: "playwright/performance.route-budgets.spec.ts",
        mustInclude: ['{ route: "/codestream", name: "CodeStream",'],
      },
      {
        file: "playwright/dev-runtime.smoke.spec.ts",
        mustInclude: ['{ route: "/codestream", label: "CodeStream" }'],
      },
    ],
  },
  "/side-projects": {
    vitest: [
      {
        file: "src/pages/SideProjects/SideProjects.test.js",
        mustInclude: ["pageRoute: PageRoute.SIDE_PROJECTS"],
      },
    ],
    playwright: [
      { file: "playwright/pages/side-projects.spec.ts", mustInclude: ['route: "/side-projects"'] },
    ],
  },
  "/hackathon": {
    vitest: [
      {
        file: "src/pages/Hackathon/Hackathon.test.js",
        mustInclude: ["pageRoute: PageRoute.HACKATHON"],
      },
    ],
    playwright: [
      { file: "playwright/pages/hackathon.spec.ts", mustInclude: ['route: "/hackathon"'] },
    ],
  },
  "/smu": {
    vitest: [
      { file: "src/pages/SMU/SMU.test.jsx", mustInclude: ["pageRoute: PageRoute.EDUCATION"] },
    ],
    playwright: [{ file: "playwright/pages/smu.spec.ts", mustInclude: ['route: "/smu"'] }],
  },
  "/contact": {
    vitest: [
      {
        file: "src/pages/__tests__/Contact.test.jsx",
        mustInclude: ['initialEntries: ["/contact"]'],
      },
    ],
    playwright: [
      { file: "playwright/pages/contact.spec.ts", mustInclude: ['page.goto("/contact")'] },
      {
        file: "playwright/accessibility.routes.spec.ts",
        mustInclude: ['route: "/contact"', 'name: "Contact"'],
      },
      {
        file: "playwright/performance.route-budgets.spec.ts",
        mustInclude: ['{ route: "/contact", name: "Contact",'],
      },
    ],
  },
  "/docs": {
    vitest: [{ file: "src/pages/Docs/Docs.test.jsx", mustInclude: ["pageRoute: PageRoute.DOCS"] }],
    playwright: [
      { file: "playwright/pages/docs.spec.ts", mustInclude: ['route: "/docs"'] },
      {
        file: "playwright/dev-runtime.smoke.spec.ts",
        mustInclude: ['{ route: "/docs", label: "Docs" }'],
      },
    ],
  },
  "/health": {
    vitest: [{ file: "src/pages/Health/Health.test.jsx", mustInclude: ['describe("Health page"'] }],
    playwright: [{ file: "playwright/pages/health.spec.ts", mustInclude: ['toUrl("/health")'] }],
  },
});
