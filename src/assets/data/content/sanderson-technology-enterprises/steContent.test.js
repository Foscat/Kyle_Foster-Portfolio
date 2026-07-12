/**
 * @file steContent.test.js
 * @description Public-safe content contract tests for the Sanderson Technology Enterprises page.
 * @module assets/data/content/sanderson-technology-enterprises/steContent.test
 */

import { describe, expect, it } from "vitest";
import pageSummaryMetas from "assets/data/pageSummaryMetas.js";
import { BlockType } from "types/ui.types.js";
import resumeData from "assets/data/content/resumeData.js";
import sandersonTechnologyEnterprisesSections from "./index.js";

const flattenLinkItems = () =>
  sandersonTechnologyEnterprisesSections.flatMap((section) =>
    (section.blocks ?? [])
      .filter((block) => block?.type === BlockType.LINKS)
      .flatMap((block) => block.items ?? [])
  );

describe("sanderson technology enterprises content", () => {
  it("presents public STE work without exposing private project surfaces", () => {
    const sectionIds = sandersonTechnologyEnterprisesSections.map((section) => section.id);
    const content = JSON.stringify(sandersonTechnologyEnterprisesSections);

    expect(sectionIds).toEqual([
      "ste-overview",
      "ste-website",
      "ste-golden-goose",
      "ste-ui-bundle",
      "ste-links",
    ]);
    expect(content).toContain("Sanderson Technology Enterprises");
    expect(content).toContain("Golden Goose");
    expect(content).toContain("private/proprietary");
    expect(content).toContain("MERN-App-Template+Auth");
    expect(content).toContain("portfolio");
    expect(content).not.toMatch(/notion|docs\.notion|workspace|secret|token|private repo/iu);
  });

  it("documents the three-package UI bundle and STE style config as content", () => {
    const content = JSON.stringify(sandersonTechnologyEnterprisesSections);
    const styleConfigBlock = sandersonTechnologyEnterprisesSections
      .flatMap((section) => section.blocks ?? [])
      .find((block) => block?.id === "ste-style-config");
    const styleSubtitles = (styleConfigBlock?.items ?? []).map((item) => item.subtitle);

    expect(content).toContain("layout-style-css");
    expect(content).toContain("ui-style-kit-css");
    expect(content).toContain("interactive-surface-css");
    expect(styleSubtitles).toContain('mode = "auto" || "dark"');
    expect(styleSubtitles).toContain('ui-style = "Cyberpunk"');
    expect(styleSubtitles).toContain('layout-style = "Retrofuturism"');
    expect(styleSubtitles).toContain('palette = "Midnight-Gold"');
  });

  it("frames STE as professional work without founder positioning", () => {
    const content = JSON.stringify(sandersonTechnologyEnterprisesSections);

    expect(content).toContain("work for Sanderson Technology Enterprises");
    expect(content).toContain("professional engagement");
    expect(content).not.toMatch(
      /founder|co-founder|owner-operated|my company|where I apply|my STE work/iu
    );
  });

  it("keeps the resume STE entry focused on senior developer work", () => {
    const steExperience = resumeData.experience.find(
      (experience) => experience.id === "sanderson-technology-enterprises"
    );
    const content = JSON.stringify(steExperience);

    expect(content).toContain("STE business needs");
    expect(content).toContain("Lead technical scoping");
    expect(content).not.toMatch(/founder|co-founder|independent clients|creator-focused brands/iu);
  });

  it("keeps STE metadata aligned with full-time-role positioning", () => {
    const metadata = pageSummaryMetas.SandersonTechnologyEnterprises;

    expect(metadata.jobTitle).toBe("Senior Developer");
    expect(metadata.description).toContain("for Sanderson Technology Enterprises");
    expect(JSON.stringify(metadata)).not.toMatch(
      /founder|co-founder|creator-owned platform development/iu
    );
  });

  it("links only to public destinations", () => {
    const links = flattenLinkItems();
    const urlsByTitle = new Map(links.map((link) => [link.title, link.url]));

    expect(urlsByTitle.get("Visit STE Website")).toBe(
      "https://sandersontechnologyenterprises.com/"
    );
    expect(urlsByTitle.get("View Layout Style CSS")).toBe("/side-projects#layout-style-css");
    expect(urlsByTitle.get("View MERN Template")).toBe("/side-projects#mern-template");
    for (const link of links) {
      expect(link.url).not.toMatch(/notion|golden-goose|github\.com\/Foscat\/Golden/iu);
    }
  });
});
