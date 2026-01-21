import SMU from "./index";
import smuSections from "assets/data/smuSections";
import { PageRoute } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests";

createPageTests({
  PageComponent: SMU,
  sections: smuSections,
  pageRoute: PageRoute.SMU,
  pageName: "SMU",
});
