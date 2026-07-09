/**
 * @file resumeData.test.js
 * @description Content contract tests for resume data used by the in-app resume preview.
 * @module assets/data/content/resumeData.test
 */

import { describe, expect, it } from "vitest";
import resumeData from "./resumeData.js";

describe("resume data", () => {
  it("uses the July 2026 accurate developer experience claim", () => {
    expect(resumeData.summary).toContain("7+ years of experience");
    expect(resumeData.summary).not.toContain("6+ years of experience");
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
  });
});
