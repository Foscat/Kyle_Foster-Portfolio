import Home from "./index";
import { homeSections } from "assets/data/homeSections";
import { PageRoute } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests";

createPageTests({
  PageComponent: Home,
  sections: homeSections,
  pageRoute: PageRoute.HOME,
  pageName: "Home",
});
