/**
 * @file index.js
 * @description Barrel export for shared data modules and resume asset references.
 * @module assets/data/index
 */

import {
  codestreamSections,
  contactSections,
  contactAltSections,
  hackathonSections,
  homeSections,
  sideProjectsSections,
  smuSections,
} from "./content";
import pageMetas from "./pageMetas.js";
import seniorDeveloperResume from "./resume/Kyle_Foster_Senior_Developer_Resume.pdf";

export {
  codestreamSections,
  contactSections,
  contactAltSections,
  hackathonSections,
  homeSections,
  sideProjectsSections,
  smuSections,
  pageMetas,
  seniorDeveloperResume as resumeLight,
  seniorDeveloperResume as resumeDark,
};
