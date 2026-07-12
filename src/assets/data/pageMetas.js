/**
 * @file pageMetas.js
 * @description Backward-compatible page metadata registry with sections.
 * Prefer importing `pageSummaryMetas` for lightweight head/page chrome data.
 * @module assets/data/pageMetas
 */

import {
  codestreamSections,
  homeSections,
  hackathonSections,
  sandersonTechnologyEnterprisesSections,
  sideProjectsSections,
  smuSections,
  contactSections,
  docsSections,
} from "./content";
import pageSummaryMetas from "./pageSummaryMetas";

const pageMetas = {
  Home: {
    ...pageSummaryMetas.Home,
    sections: homeSections,
  },
  Codestream: {
    ...pageSummaryMetas.Codestream,
    sections: codestreamSections,
  },
  Hackathon: {
    ...pageSummaryMetas.Hackathon,
    sections: hackathonSections,
  },
  SandersonTechnologyEnterprises: {
    ...pageSummaryMetas.SandersonTechnologyEnterprises,
    sections: sandersonTechnologyEnterprisesSections,
  },
  SideProjects: {
    ...pageSummaryMetas.SideProjects,
    sections: sideProjectsSections,
  },
  Smu: {
    ...pageSummaryMetas.Smu,
    sections: smuSections,
  },
  Contact: {
    ...pageSummaryMetas.Contact,
    sections: contactSections,
  },
  Docs: {
    ...pageSummaryMetas.Docs,
    sections: docsSections,
  },
};

Object.freeze(pageMetas);

export default pageMetas;
