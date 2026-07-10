/**
 * @file SandersonTechnologyEnterprises.test.jsx
 * @description Page-level tests for the Sanderson Technology Enterprises case study.
 * @module pages/SandersonTechnologyEnterprises/SandersonTechnologyEnterprises.test
 */

import SandersonTechnologyEnterprises from "./index.jsx";
import sandersonTechnologyEnterprisesSections from "assets/data/content/sanderson-technology-enterprises";
import { PageRoute } from "types/navigation.types";
import { createPageTests } from "tests/helpers/createPageTests.jsx";

createPageTests({
  PageComponent: SandersonTechnologyEnterprises,
  sections: sandersonTechnologyEnterprisesSections,
  pageRoute: PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES,
  pageName: "Sanderson Technology Enterprises",
});
