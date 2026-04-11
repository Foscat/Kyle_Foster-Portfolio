/**
 * @file playwright\pages\side-projects.spec.ts
 * @description playwright\pages\side-projects.spec module.
 * @module playwright\pages\side-projects.spec
 */

import { createPageTestSuite } from "../utils/pageTestTemplate.ts";

createPageTestSuite({
  name: "Side Projects page",
  route: "/side-projects",
});
