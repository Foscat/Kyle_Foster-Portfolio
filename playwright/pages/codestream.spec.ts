import { runPageTests } from "../utils/pageTestTemplate";

runPageTests({
  name: "Codestream page",
  route: "/codestream",
  snapshotName: "codestream-page.png",
});
