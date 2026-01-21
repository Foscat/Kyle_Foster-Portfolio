import { PageRoute } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests";
import SideProjects from "./index";
import sideProjectsData from "assets/data/sideprojectSections";
sideProjectsData;

createPageTests({
  PageComponent: SideProjects,
  sections: sideProjectsData,
  pageRoute: PageRoute.SIDE_PROJECTS,
  pageName: "Side Projects",
});
