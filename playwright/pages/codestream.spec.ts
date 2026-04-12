/**
 * @file playwright\pages\codestream.spec.ts
 * @description playwright\pages\codestream.spec module.
 * @module playwright\pages\codestream.spec
 */

import { createPageTestSuite } from "../utils/pageTestTemplate.ts";

createPageTestSuite({
  name: "Codestream page",
  route: "/codestream",
});
