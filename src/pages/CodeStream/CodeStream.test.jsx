import CodeStream from "./index";
import codeStreamSections from "assets/data/codestreamSections";
import { PageRoute } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests";

createPageTests({
  PageComponent: CodeStream,
  sections: codeStreamSections,
  pageRoute: PageRoute.CODE_STREAM,
  pageName: "Code Stream",
});
