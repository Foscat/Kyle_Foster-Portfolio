/**
 * @file src\pages\Docs\Docs.test.jsx
 * @description src\pages\Docs\Docs.test module.
 * @module src\pages\Docs\Docs.test
 */

import Docs from "pages/Docs";
import docsSections from "assets/data/content/docs";
import { PageRoute } from "types/navigation.types";
import { createPageTests } from "tests/helpers/createPageTests.jsx";

/**
 * @file Docs.test.jsx
 * @description Page-level tests for the Docs page.
 *
 * Testing focus:
 * - Route-to-page association for `/docs`
 * - Shared page composition behavior via `createPageTests`
 */

createPageTests({
  PageComponent: Docs,
  sections: docsSections,
  pageRoute: PageRoute.DOCS,
  pageName: "Docs",
});
