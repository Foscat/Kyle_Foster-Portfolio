/**
 * @file src\assets\data\content\index.js
 * @description src\assets\data\content\index module.
 * @module src\assets\data\content\index
 */

import codestreamSections from "./codestream";
import contactSections from "./contact";
import hackathonSections from "./hackathon";
import homeSections from "./home";
import sideProjectsSections from "./side-projects";
import smuSections from "./smu";
import docsSections from "./docs";
import diagrams from "./diagrams.js";

// `contact/alt` content was merged into `contact`; keep the alias export stable.
const contactAltSections = contactSections;

export {
  codestreamSections,
  contactSections,
  contactAltSections,
  hackathonSections,
  homeSections,
  sideProjectsSections,
  smuSections,
  docsSections,
  diagrams,
};
