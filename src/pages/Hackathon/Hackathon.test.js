import Hackathon from "./index";
import hackathonSections from "assets/data/hackathonSections";
import { PageRoute } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests";

createPageTests({
  PageComponent: Hackathon,
  sections: hackathonSections,
  pageRoute: PageRoute.HACKATHON,
  pageName: "Hackathon",
});
