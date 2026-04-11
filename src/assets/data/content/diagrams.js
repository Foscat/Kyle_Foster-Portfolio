/**
 * @file src\assets\data\content\diagrams.js
 * @description src\assets\data\content\diagrams module.
 * @module src\assets\data\content\diagrams
 */

import { diagramValues as smuDiagrams } from "./smu/diagrams.js";
import { diagramValues as hackathonDiagrams } from "./hackathon/diagrams.js";
import { diagramValues as codestreamDiagrams } from "./codestream/diagrams.js";
import { diagramValues as sideProjectsDiagrams } from "./side-projects/diagrams.js";

const diagrams = [
  ...smuDiagrams,
  ...hackathonDiagrams,
  ...codestreamDiagrams,
  ...sideProjectsDiagrams,
];
Object.freeze(diagrams);

export default diagrams;
