/**
 * @file scripts/docs/pure-jsdoc-markdown.node-test.mjs
 * @description Tests pure-Markdown rendering for generated JSDoc reference files.
 * @module scripts/docs/pure-jsdoc-markdown.node-test
 */
import assert from "node:assert/strict";
import test from "node:test";

import {
  containsHtmlElement,
  createPureMarkdownFromTemplateData,
  htmlToMarkdownText,
} from "./pure-jsdoc-markdown.mjs";

test("htmlToMarkdownText converts common JSDoc HTML fragments to Markdown", () => {
  const markdown = htmlToMarkdownText(
    '<p>Use <code>token</code> with <strong>care</strong>.</p><ul><li>First</li><li><a href="https://example.com/docs">Docs</a></li></ul>'
  );

  assert.equal(
    markdown,
    "Use `token` with **care**.\n\n- First\n- [Docs](https://example.com/docs)"
  );
  assert.equal(containsHtmlElement(markdown), false);
});

test("htmlToMarkdownText removes unsafe script and style fragments", () => {
  const payloads = [
    '<script>alert("xss")</script>',
    '<style>.hidden{display:none}</style>',
    "<script",
    '<script>alert("xss")</script',
    '<scr<script>alert("xss")</script>ipt>',
    "<sty<style>.hidden{display:none}</style>le>",
  ];

  for (const payload of payloads) {
    const markdown = htmlToMarkdownText(`<p>Safe <strong>content</strong>.</p>${payload}`);

    assert.equal(markdown, "Safe **content**.");
    assert.doesNotMatch(markdown, /<\s*\/?\s*(script|style)\b/i);
    assert.equal(containsHtmlElement(markdown), false);
  }
});

test("createPureMarkdownFromTemplateData renders API doclets without HTML", () => {
  const markdown = createPureMarkdownFromTemplateData(
    [
      {
        kind: "module",
        name: "payments",
        longname: "module:payments",
        description: "Payment <strong>checkout</strong> API.",
      },
      {
        kind: "function",
        name: "createCheckoutSession",
        longname: "module:payments.createCheckoutSession",
        memberof: "module:payments",
        description: "Creates <code>checkout</code> metadata.",
        params: [
          {
            name: "productId",
            type: { names: ["string"] },
            description: "Product identifier.",
          },
          {
            name: "options.returnUrl",
            type: { names: ["string"] },
            optional: true,
            defaultvalue: "/account",
            description: "Return URL.",
          },
        ],
        returns: [
          {
            type: { names: ["Promise.<CheckoutSession>"] },
            description: "Safe checkout metadata.",
          },
        ],
        examples: ["const session = await createCheckoutSession();"],
      },
    ],
    { title: "Sample Reference" }
  );

  assert.match(markdown, /^# Sample Reference/u);
  assert.match(markdown, /## payments/u);
  assert.match(markdown, /### createCheckoutSession\(\)/u);
  assert.match(markdown, /Payment \*\*checkout\*\* API\./u);
  assert.match(markdown, /Creates `checkout` metadata\./u);
  assert.match(markdown, /- `productId` \(`string`\) - Product identifier\./u);
  assert.match(markdown, /- `options.returnUrl` \(`string`, optional, default: `\/account`\) - Return URL\./u);
  assert.match(markdown, /- `Promise<CheckoutSession>` - Safe checkout metadata\./u);
  assert.match(markdown, /```js\nconst session = await createCheckoutSession\(\);\n```/u);
  assert.equal(containsHtmlElement(markdown), false);
});

test("createPureMarkdownFromTemplateData escapes heading text that markdownlint treats as emphasis", () => {
  const markdown = createPureMarkdownFromTemplateData(
    [
      {
        kind: "module",
        name: "client/ui/__tests__/AccessStatus.test",
        longname: "module:client/ui/__tests__/AccessStatus.test",
        description: "Tests for access status messaging.",
      },
    ],
    { title: "Heading Reference" }
  );

  assert.match(markdown, /## client\/ui\/\\_\\_tests\\_\\_\/AccessStatus.test/u);
  assert.doesNotMatch(markdown, /[^\\]__/u);
});

test("createPureMarkdownFromTemplateData keeps fenced examples out of list summaries", () => {
  const markdown = createPureMarkdownFromTemplateData([
    {
      kind: "function",
      name: "buildSources",
      longname: "buildSources",
      description: "Builds diagram sources.",
      returns: [
        {
          type: { names: ["object"] },
          description: "Source map.\n\n```js\nconst sources = buildSources();\n```",
        },
      ],
    },
  ]);

  assert.match(markdown, /- `object` - Source map\./u);
  assert.doesNotMatch(markdown, /```js[\s\S]*?```.*Returns/u);
});
