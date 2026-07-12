/**
 * @file resumeData.test.js
 * @description Content contract tests for resume data used by the in-app resume preview.
 * @module assets/data/content/resumeData.test
 */

import { describe, expect, it } from "vitest";
import resumeData from "./resumeData.js";

describe("resume data", () => {
  it("uses an evergreen developer experience claim", () => {
    expect(resumeData.title).toBe("Senior React / Frontend Engineer");
    expect(resumeData.summary).toContain("building software since 2018");
    expect(resumeData.summary).not.toMatch(/\d+\+ years/u);
  });

  it("keeps the career timeline anchored to the August 2018 start", () => {
    const smuEducation = resumeData.education.find((item) => item.id === "smu-coding-bootcamp");

    expect(smuEducation?.dates).toBe("August 2018 - February 2019");
    expect(JSON.stringify(resumeData)).toContain("CodeStream Studios LLC");
    expect(JSON.stringify(resumeData)).toContain("Sanderson Technology Enterprises");
  });

  it("positions STE and CSS library work without founder-style language", () => {
    const resumeContent = JSON.stringify(resumeData);
    const cssLibraryProject = resumeData.projects.find(
      (project) => project.id === "css-library-systems"
    );

    expect(resumeContent).toContain("custom business systems");
    expect(resumeContent).toContain("layout-style-css");
    expect(cssLibraryProject?.subtitle).toContain("Layout Style CSS");
    expect(cssLibraryProject?.subtitle).toContain("UI Style Kit CSS");
    expect(cssLibraryProject?.subtitle).toContain("Interactive Surface CSS");
    expect(resumeContent).not.toMatch(/founder|co-founder|my company|owner-operated/iu);
    expect(
      resumeData.experience.find(({ id }) => id === "sanderson-technology-enterprises")?.role
    ).toBe("Senior Developer");
    expect(resumeData.experience.find(({ id }) => id === "codestream-studios")?.role).toBe(
      "Senior Frontend Engineer"
    );
  });
});
