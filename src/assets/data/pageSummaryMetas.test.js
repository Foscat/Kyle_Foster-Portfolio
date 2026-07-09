/**
 * @file pageSummaryMetas.test.js
 * @description Content contract tests for lightweight route metadata.
 * @module assets/data/pageSummaryMetas.test
 */

import { describe, expect, it } from "vitest";
import pageSummaryMetas from "./pageSummaryMetas.js";

describe("page summary metadata", () => {
  it("labels the CodeStream route by employer instead of generic professional work", () => {
    const codestream = pageSummaryMetas.Codestream;

    expect(codestream.title).toBe("CodeStream Studios");
    expect(codestream.seoTitle).toContain("CodeStream Studios Case Study");
    expect(codestream.description).toContain("CodeStream Studios");
    expect(JSON.stringify(codestream)).not.toContain("Professional Work");
  });

  it("uses the August 2018 portfolio start for current career-span metadata", () => {
    expect(pageSummaryMetas.Home.timespan).toBe("August 2018 - Present");
    expect(pageSummaryMetas.SideProjects.timespan).toBe("August 2018 - Present");
    expect(pageSummaryMetas.Home.description).toContain("7+ years");
    expect(JSON.stringify(pageSummaryMetas)).not.toContain("2018 - Current");
  });

  it("keeps current project metadata aligned with the active public portfolio", () => {
    const sideProjects = JSON.stringify(pageSummaryMetas.SideProjects);
    const ste = JSON.stringify(pageSummaryMetas.SandersonTechnologyEnterprises);

    expect(sideProjects).toContain("CSS utility libraries");
    expect(sideProjects).not.toMatch(/encryption|enigma/iu);
    expect(ste).toContain("professional work for Sanderson Technology Enterprises");
    expect(ste).toContain("three-package UI bundle");
    expect(ste).not.toMatch(/founder|co-founder|my company|owner-operated/iu);
  });
});
