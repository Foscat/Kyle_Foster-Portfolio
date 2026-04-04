/**
 * @file index.js
 * @description Barrel export for shared data modules and static resume asset references.
 * @module assets/data/index
 */

import {
  codestreamSections,
  contactSections,
  hackathonSections,
  homeSections,
  sideProjectsSections,
  smuSections,
} from "./content";
import pageMetas from "./pageMetas.js";
import resumeLight from "./resume/Kyle Foster _ Senior React _ Frontend Engineer_LightMode.pdf";
import resumeDark from "./resume/Kyle Foster _ Senior React _ Frontend Engineer_DarkMode.pdf";

const resume = resumeLight;

export {
  codestreamSections,
  contactSections,
  hackathonSections,
  homeSections,
  sideProjectsSections,
  smuSections,
  pageMetas,
  resume,
  resumeLight,
  resumeDark,
};
