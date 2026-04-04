import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import LinksBlock from ".";

vi.mock("components/ui", async () => {
  const actual = await vi.importActual("components/ui");
  return {
    ...actual,
    Btn: ({ href, text }) => <a href={href}>{text}</a>,
  };
});

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
  });

  /**
   * Verifies the component renders nothing when `links` is null.
   * Guards against malformed CMS or configuration input.
   */
  it("renders nothing if links are missing", () => {
    renderWithProviders(
      <div data-testid="root">
        <LinksBlock items={null} />
      </div>
    );

    expect(screen.getByTestId("root")).toBeEmptyDOMElement();
  });

  /**
   * Verifies that valid link data produces accessible anchor elements
   * with the expected href attributes.
   */
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

  it("uses the dark resume URL when dark theme is active", () => {
    window.localStorage.setItem("portfolio-theme", "dark");

    renderWithProviders(
      <LinksBlock
        items={[
          {
            title: "Download Resume",
            url: "/resume-default.pdf",
            urlLight: "/resume-light.pdf",
            urlDark: "/resume-dark.pdf",
            download: true,
          },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "Download Resume" })).toHaveAttribute(
      "href",
      "/resume-dark.pdf"
    );
  });

  it("uses the light resume URL when light theme is active", () => {
    window.localStorage.setItem("portfolio-theme", "light");

    renderWithProviders(
      <LinksBlock
        items={[
          {
            title: "Download Resume",
            url: "/resume-default.pdf",
            urlLight: "/resume-light.pdf",
            urlDark: "/resume-dark.pdf",
            download: true,
          },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "Download Resume" })).toHaveAttribute(
      "href",
      "/resume-light.pdf"
    );
  });
});
