/**
 * @file src\components\renderers\__tests__\MarkdownRenderer.test.jsx
 * @description src\components\renderers\__tests__\MarkdownRenderer.test module.
 * @module src\components\renderers\__tests__\MarkdownRenderer.test
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import MarkdownRenderer from "../MarkdownRenderer";

describe("MarkdownRenderer", () => {
  it("strips raw HTML tags instead of rendering live DOM elements", () => {
    renderWithProviders(
      <MarkdownRenderer content={"<textarea>Unsafe</textarea>\n\n<Accordion>Section</Accordion>"} />
    );

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByText("Unsafe")).not.toBeInTheDocument();
    expect(screen.queryByText("Section")).not.toBeInTheDocument();
  });

  it("still renders standard markdown content", () => {
    renderWithProviders(<MarkdownRenderer content={"# Heading\n\nParagraph copy"} />);

    expect(screen.getByRole("heading", { name: "Heading" })).toBeInTheDocument();
    expect(screen.getByText("Paragraph copy")).toBeInTheDocument();
  });
});
