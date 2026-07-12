/**
 * @file src\components\renderers\blocks\LinksBlock\LinksBlock.test.jsx
 * @description src\components\renderers\blocks\LinksBlock\LinksBlock.test module.
 * @module src\components\renderers\blocks\LinksBlock\LinksBlock.test
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import LinksBlock from "../blocks/LinksBlock";

vi.mock("components/ui", async () => {
  const actual = await vi.importActual("components/ui");
  return {
    ...actual,
    Btn: ({ href, text, target, rel }) => (
      <a href={href} target={target} rel={rel}>
        {text}
      </a>
    ),
  };
});

vi.mock("components/features/ResumePreview/ResumePreviewTrigger", () => ({
  default: ({ buttonText, downloadName, buttonClassName, pdfHref }) => (
    <button
      type="button"
      data-testid="resume-preview-trigger"
      data-download-name={downloadName}
      data-pdf-href={pdfHref}
      className={buttonClassName}
    >
      {buttonText}
    </button>
  ),
}));

/**
 * @file LinksBlock.test.jsx
 * @description Unit tests for the LinksBlock component.
 *
 * Testing focus:
 * - Defensive rendering behavior when link data is missing
 * - Correct rendering of anchor elements with expected attributes
 *
 * Design intent:
 * LinksBlock is intentionally minimal and data-driven.
 * These tests ensure it:
 * - Fails silently when provided with invalid input
 * - Renders accessible anchor elements when valid data is supplied
 *
 * @module tests/components/blocks/LinksBlock
 */

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("LinksBlock", () => {
  beforeEach(() => {
    window.localStorage.removeItem("portfolio-theme");
    window.localStorage.removeItem("portfolio-palette");
  });

  it("renders nothing if links are missing", () => {
    renderWithProviders(
      <div data-testid="root">
        <LinksBlock items={null} />
      </div>
    );

    expect(screen.getByTestId("root")).toBeEmptyDOMElement();
  });

  it("renders a list of links", () => {
    renderWithProviders(
      <LinksBlock
        items={[
          { title: "GitHub", url: "https://github.com" },
          { title: "Website", url: "https://example.com" },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com"
    );
    expect(screen.getByRole("link", { name: "Website" })).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  it("opens external links safely unless the content opts into the current tab", () => {
    renderWithProviders(
      <LinksBlock
        items={[
          { title: "External", url: "https://example.com" },
          { title: "Same Tab", url: "https://example.org", target: "_self" },
          { title: "Internal", url: "/contact", local: true },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );
    expect(screen.getByRole("link", { name: "Same Tab" })).toHaveAttribute("target", "_self");
    expect(screen.getByRole("link", { name: "Same Tab" })).not.toHaveAttribute("rel");
    expect(screen.getByRole("link", { name: "Internal" })).not.toHaveAttribute("target");
    expect(screen.getByRole("link", { name: "Internal" })).not.toHaveAttribute("rel");
  });

  it("skips malformed link items without a URL", () => {
    renderWithProviders(
      <LinksBlock
        items={[
          { title: "Missing URL", url: "" },
          { title: "Website", url: "https://example.com" },
        ]}
      />
    );

    expect(screen.queryByRole("link", { name: "Missing URL" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Website" })).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  it("uses the dark theme-specific URL when dark theme is active", () => {
    window.localStorage.setItem("portfolio-theme", "dark");

    renderWithProviders(
      <LinksBlock
        items={[
          {
            title: "Download Reference",
            url: "/reference-default.pdf",
            urlLight: "/reference-light.pdf",
            urlDark: "/reference-dark.pdf",
            download: true,
          },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "Download Reference" })).toHaveAttribute(
      "href",
      "/reference-dark.pdf"
    );
  });

  it("uses the light theme-specific URL when light theme is active", () => {
    window.localStorage.setItem("portfolio-theme", "light");

    renderWithProviders(
      <LinksBlock
        items={[
          {
            title: "Download Reference",
            url: "/reference-default.pdf",
            urlLight: "/reference-light.pdf",
            urlDark: "/reference-dark.pdf",
            download: true,
          },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "Download Reference" })).toHaveAttribute(
      "href",
      "/reference-light.pdf"
    );
  });

  it("renders resume preview trigger links with theme and palette aware download names", () => {
    window.localStorage.setItem("portfolio-theme", "light");
    window.localStorage.setItem("portfolio-palette", "ocean-steel");

    renderWithProviders(
      <LinksBlock
        items={[
          {
            title: "View Resume",
            resumePreview: true,
          },
        ]}
      />
    );

    const trigger = screen.getByTestId("resume-preview-trigger");
    expect(trigger).toHaveTextContent("View Resume");
    const downloadName = trigger.getAttribute("data-download-name") || "";
    expect(downloadName).toMatch(
      /^Kyle-Foster-Senior-React-Frontend-Engineer-Resume-light-[a-z0-9-]+\.pdf$/
    );
    expect(trigger).not.toHaveAttribute("data-pdf-href");
    expect(trigger).toHaveClass("links-block-item");
  });

  it("does not attach a static PDF asset to resume preview links when dark theme is active", () => {
    window.localStorage.setItem("portfolio-theme", "dark");

    renderWithProviders(
      <LinksBlock
        items={[
          {
            title: "View Resume",
            resumePreview: true,
          },
        ]}
      />
    );

    const trigger = screen.getByTestId("resume-preview-trigger");
    expect(trigger).not.toHaveAttribute("data-pdf-href");
    expect(trigger.getAttribute("data-download-name") || "").toMatch(
      /^Kyle-Foster-Senior-React-Frontend-Engineer-Resume-dark-[a-z0-9-]+\.pdf$/
    );
  });
});
