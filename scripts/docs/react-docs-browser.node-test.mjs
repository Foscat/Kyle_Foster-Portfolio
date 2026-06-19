/**
 * @file scripts/docs/react-docs-browser.node-test.mjs
 * @description Tests browser-safe React documentation helpers.
 * @module scripts/docs/react-docs-browser.node-test
 */
import assert from "node:assert/strict";
import test from "node:test";

import {
  copyMarkdownToClipboard,
  createMarkdownDownload,
  createReactMarkdownReference,
  createReferenceManifest,
  validateClientMarkdown,
} from "./react-docs-browser.mjs";

test("createReactMarkdownReference renders browser-safe Markdown from template data", () => {
  const markdown = createReactMarkdownReference(
    [
      {
        kind: "module",
        name: "client/src/components/ProjectCard",
        longname: "module:client/src/components/ProjectCard",
        description: "Portfolio <strong>card</strong> component.",
      },
      {
        kind: "function",
        name: "ProjectCard",
        longname: "module:client/src/components/ProjectCard.ProjectCard",
        memberof: "module:client/src/components/ProjectCard",
        description: "Renders <code>project</code> details.",
        params: [
          {
            name: "props.project",
            type: { names: ["object"] },
            description: "Project data.",
          },
        ],
        returns: [{ type: { names: ["JSX.Element"] }, description: "Rendered card." }],
      },
    ],
    { title: "Portfolio Client Reference" }
  );

  assert.match(markdown, /^# Portfolio Client Reference/u);
  assert.match(markdown, /Portfolio \*\*card\*\* component\./u);
  assert.match(markdown, /Renders `project` details\./u);
  assert.equal(validateClientMarkdown(markdown).ok, true);
});

test("createMarkdownDownload normalizes unsafe file names and content", () => {
  const payload = createMarkdownDownload("# Reference\r\n", "client/reference:docs");

  assert.equal(payload.fileName, "client-reference-docs.md");
  assert.equal(payload.mimeType, "text/markdown;charset=utf-8");
  assert.equal(payload.content, "# Reference\n");
});

test("createReferenceManifest returns sorted normalized entries", () => {
  const manifest = createReferenceManifest([
    {
      sectionKey: "hooks",
      sectionTitle: "Hooks",
      title: "useBreakpoint",
      sourcePath: "src/assets/hooks/useBreakpoint/index.js",
      docFileName: "useBreakpointHook.md",
      markdown: "# useBreakpoint",
    },
    {
      sectionKey: "components",
      sectionTitle: "Components",
      title: "ProjectCard",
      sourcePath: "src/components/ui/ProjectCard/index.jsx",
      docFileName: "ProjectCardComponent.md",
      markdown: "# ProjectCard",
    },
  ]);

  assert.deepEqual(
    manifest.map((entry) => entry.title),
    ["ProjectCard", "useBreakpoint"]
  );
  assert.equal(manifest[0].docFileName, "ProjectCardComponent.md");
});

test("copyMarkdownToClipboard uses the browser clipboard API when available", async () => {
  let copiedText = "";
  const copied = await copyMarkdownToClipboard("# Reference", {
    clipboard: {
      writeText: async (value) => {
        copiedText = value;
      },
    },
  });

  assert.equal(copied, true);
  assert.equal(copiedText, "# Reference");
});

test("copyMarkdownToClipboard reports unavailable clipboard support", async () => {
  const copied = await copyMarkdownToClipboard("# Reference", {});
  assert.equal(copied, false);
});

test("validateClientMarkdown reports HTML that would be skipped by the renderer", () => {
  assert.deepEqual(validateClientMarkdown("<dl><dt>Unsafe</dt></dl>"), {
    ok: false,
    issues: ["Markdown still contains HTML elements."],
  });
});
