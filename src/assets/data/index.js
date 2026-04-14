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
import resumeAts from "./Kyle_Foster_React_Resume.pdf";
import resumeLight from "./resume/Kyle Foster _ Senior React _ Frontend Engineer_LightMode.pdf";
import resumeDark from "./resume/Kyle Foster _ Senior React _ Frontend Engineer_DarkMode.pdf";

const resume = resumeAts;

export {
  codestreamSections,
  contactSections,
  hackathonSections,
  homeSections,
  sideProjectsSections,
  smuSections,
  pageMetas,
  resumeAts,
  resume,
  resumeLight,
  resumeDark,
};
