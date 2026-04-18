/**
 * @file renderNode.test.jsx
 * @fileoverview Tests for the renderNode function used in the RichText renderer.
 * @description Tests for the renderNode function, ensuring it correctly renders various node types such as text, links, lists, code blocks, and inline icons, and handles unknown or null nodes gracefully without throwing errors.
 * @module components/renderers/RichText/renderNode
 */

import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import renderNode from "../RichText/renderNode";
import renderWithProviders from "tests/renderWithProviders";

// Helper function to render a single node using the renderNode function, allowing us to test the rendering of individual nodes in isolation and verify that they produce the expected output in the DOM.
const renderSingle = (node) => {
  renderWithProviders(<>{renderNode(node, "test")}</>);
};

// Mock the SyntaxHighlighter component from the react-syntax-highlighter library to simplify testing and focus on the renderNode function's behavior, allowing us to verify that code blocks are rendered with the correct structure and content without relying on the actual implementation of the SyntaxHighlighter component.
describe("renderNode", () => {
  it("renders plain text nodes", () => {
    renderSingle({ type: "text", text: "Hello world" });
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  // Test that the renderNode function correctly renders link nodes with the appropriate href attribute, ensuring that links are rendered as anchor elements with the correct destination URL when provided in the node data. This verifies that the renderNode function handles link nodes properly and produces the expected output in the DOM for link elements.
  it("renders links with href", () => {
    renderSingle({ type: "a", href: "/docs", text: "Docs" });
    const link = screen.getByRole("link", { name: "Docs" });

    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveClass("interactive-surface");
  });

  // Test that the renderNode function correctly renders unordered list nodes with the appropriate structure and content, ensuring that lists are rendered as unordered list elements with the correct list items when provided in the node data. This verifies that the renderNode function handles list nodes properly and produces the expected output in the DOM for list elements.
  it("renders list content", () => {
    renderSingle({
      type: "ul",
      children: [
        { type: "li", children: [{ type: "text", text: "Item 1" }] },
        { type: "li", children: [{ type: "text", text: "Item 2" }] },
      ],
    });

    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(list).getByText("Item 1")).toBeInTheDocument();
    expect(within(list).getByText("Item 2")).toBeInTheDocument();
  });

  // Test that the renderNode function correctly renders inline code nodes with the appropriate structure and content, ensuring that inline code is rendered as code elements with the correct text when provided in the node data. This verifies that the renderNode function handles inline code nodes properly and produces the expected output in the DOM for inline code elements.
  it("renders inline code", () => {
    renderSingle({ type: "code", text: "const x = 1;" });
    expect(screen.getByText("const x = 1;")).toBeInTheDocument();
  });

  // Test that the renderNode function correctly renders syntax-highlighted code blocks with the appropriate structure and content, ensuring that code blocks are rendered with syntax highlighting when provided in the node data. This verifies that the renderNode function handles code block nodes properly and produces the expected output in the DOM for code block elements.
  it("renders syntax-highlighted code blocks", () => {
    renderSingle({
      type: "pre",
      language: "javascript",
      text: "const sum = (a, b) => a + b;",
    });

    const codeEl = screen.getByText((_, element) => {
      if (!element?.matches("code.language-javascript")) {
        return false;
      }

      return /const\s+sum\s+=\s+\(a,\s*b\)\s*=>\s*a\s*\+\s*b;/i.test(element.textContent || "");
    });

    expect(codeEl).toBeInTheDocument();
    expect(codeEl).toHaveClass("language-javascript");
    expect(codeEl).toHaveTextContent("const");
    expect(codeEl).toHaveTextContent("sum");
  });

  // Test that the renderNode function correctly renders inline icon nodes as visible content, ensuring that inline icons are rendered as text elements with the correct icon representation when provided in the node data. This verifies that the renderNode function handles inline icon nodes properly and produces the expected output in the DOM for inline icon elements.
  it("renders inline icons as visible content", () => {
    renderSingle({
      type: "p",
      children: [
        { type: "text", text: "Star:" },
        { type: "inlineIcon", icon: "star" },
      ],
    });

    expect(screen.getByTestId("inline-icon-star")).toBeInTheDocument();
  });

  // Test that the renderNode function does not throw errors when given unknown or null nodes, ensuring that it handles unexpected input gracefully without crashing. This verifies that the renderNode function is robust and can handle edge cases without producing errors, contributing to the overall stability of the RichText renderer.
  it("does not throw for unknown or null nodes", () => {
    expect(() => renderSingle({ type: "unknown" })).not.toThrow();
    expect(() => renderSingle(null)).not.toThrow();
  });
});
