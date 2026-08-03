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

const getSection = (sectionId) =>
  sandersonTechnologyEnterprisesSections.find((section) => section.id === sectionId);

const flattenLinkItems = () =>
  sandersonTechnologyEnterprisesSections.flatMap((section) =>
    (section.blocks ?? [])
      .filter((block) => block?.type === BlockType.LINKS)
      .flatMap((block) => block.items ?? [])
  );

const getDiagramIds = (sectionId) =>
  (getSection(sectionId)?.blocks ?? [])
    .filter((block) => block?.type === BlockType.DIAGRAM)
    .map((block) => block.id);

const getVideoBlocks = (sectionId) =>
  (getSection(sectionId)?.blocks ?? []).filter((block) => block?.type === BlockType.VIDEO);

describe("sanderson technology enterprises content", () => {
  it("presents public STE work with recruiter-facing product sections", () => {
    const sectionIds = sandersonTechnologyEnterprisesSections.map((section) => section.id);
    const content = JSON.stringify(sandersonTechnologyEnterprisesSections);

    expect(sectionIds).toEqual([
      "ste-overview",
      "ste-website",
      "ste-content-creator-platform",
      "ste-scrap-yard-system",
      "ste-interface-system",
      "ste-links",
    ]);
    expect(content).toContain("Sanderson Technology Enterprises");
    expect(content).toContain("Content Creator Platform");
    expect(content).toContain("Scrap Yard System");
    expect(content).toContain("early-stage");
    expect(content).toContain("actively developed");
    expect(content).toContain("MERN-App-Template+Auth");
    expect(content).not.toContain("White-Label Product Platform");
    expect(content).not.toMatch(
      /golden\s+goose|notion|docs\.notion|workspace|secret|token|private repo/iu
    );
  });

  it("describes the scrapyard platform as inventory management joined to commerce", () => {
    const scrapyardSection = getSection("ste-scrap-yard-system");
    const content = JSON.stringify(scrapyardSection);

    expect(content).toContain("internal inventory management system");
    expect(content).toContain("client-facing e-commerce platform");
    expect(content).toContain("web-based solution");
    expect(content).toContain("template");
    expect(content).toContain("scrapyards");
    expect(content).toContain("clean inventory management");
    expect(content).toContain("user-friendly");
    expect(content).not.toMatch(/finished|launched|proven market|market-leading/iu);
  });

  it("shows one controlled local promo for each focused STE product", () => {
    const contentCreatorVideos = getVideoBlocks("ste-content-creator-platform");
    const scrapYardVideos = getVideoBlocks("ste-scrap-yard-system");

    expect(contentCreatorVideos).toHaveLength(1);
    expect(contentCreatorVideos[0]).toMatchObject({
      title: "Content Creator Platform Demonstration",
      mimeType: "video/mp4",
      ariaLabel: "Content Creator Platform product demonstration",
    });
    expect(contentCreatorVideos[0].src).toContain("content-creator-platform-promo.mp4");
    expect(scrapYardVideos).toHaveLength(1);
    expect(scrapYardVideos[0]).toMatchObject({
      title: "Scrap Yard System Demonstration",
      mimeType: "video/mp4",
      ariaLabel: "Scrap Yard System product demonstration",
    });
    expect(scrapYardVideos[0].src).toContain("salvage-yard-system-promo.mp4");
  });

  it("connects the STE interface system to Interface Systems Lab", () => {
    const content = JSON.stringify(sandersonTechnologyEnterprisesSections);

    expect(content).toContain("Interface Systems Lab");
    expect(content).toContain("layout-style-css");
    expect(content).toContain("ui-style-kit-css");
    expect(content).toContain("ui-style-kit-icons");
    expect(content).toContain("interactive-surface-css");
    expect(content).toContain("https://foscat.github.io/ui-style-kit-css-icons/");
    expect(content).toContain("https://foscat.github.io/interface-systems-lab/");
    expect(content).toContain("https://github.com/Foscat/interface-systems-lab");

    const interfaceCards = (getSection("ste-interface-system")?.blocks ?? [])
      .filter((block) => block?.type === BlockType.CARD_GRID)
      .flatMap((block) => block.items ?? []);
    expect(interfaceCards).toHaveLength(4);
    expect(interfaceCards.map((card) => card.iconName)).toEqual([
      "grid",
      "palette",
      "module",
      "cursor",
    ]);
  });

  it("provides one Mermaid diagram for each showcased STE workstream", () => {
    const diagramContract = new Map([
      ["ste-website", "diagram-ste-public-site-journey"],
      ["ste-content-creator-platform", "diagram-ste-content-creator-platform-flow"],
      ["ste-scrap-yard-system", "diagram-ste-scrapyard-commerce-loop"],
      ["ste-interface-system", "diagram-ste-interface-system-flow"],
    ]);

    for (const [sectionId, diagramId] of diagramContract) {
      expect(getDiagramIds(sectionId), sectionId).toContain(diagramId);
    }
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
    expect(JSON.stringify(metadata)).toContain("Content Creator Platform");
    expect(JSON.stringify(metadata)).toContain("Scrap Yard System");
    expect(JSON.stringify(metadata)).not.toMatch(
      /golden\s+goose|founder|co-founder|creator-owned platform development/iu
    );
  });

  it("links only to public destinations and ecosystem anchors", () => {
    const links = flattenLinkItems();
    const urlsByTitle = new Map(links.map((link) => [link.title, link.url]));

    expect(urlsByTitle.get("Visit STE Website")).toBe(
      "https://sandersontechnologyenterprises.com/"
    );
    expect(urlsByTitle.get("View Scrap Yard System")).toBe(
      "https://sandersontechnologyenterprises.com/scrap-yard-system.html"
    );
    expect(urlsByTitle.get("View Content Creator Platform")).toBe(
      "https://sandersontechnologyenterprises.com/content-creator-platform.html"
    );
    expect(urlsByTitle.get("View Interface Systems Lab")).toBe(
      "https://foscat.github.io/interface-systems-lab/"
    );
    expect(urlsByTitle.get("View Interface Systems Lab Source")).toBe(
      "https://github.com/Foscat/interface-systems-lab"
    );
    expect(urlsByTitle.get("View Layout Style CSS")).toBe("/side-projects#layout-style-css");
    expect(urlsByTitle.get("View MERN Template")).toBe("/side-projects#mern-template");
    for (const link of links) {
      expect(link.url).not.toMatch(/notion|golden\s*goose|github\.com\/Foscat\/Golden/iu);
    }
  });
});
