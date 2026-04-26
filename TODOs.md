# Final punch list

## Priority 1 — Fix trust-breaking issues first

These are the items that can make a polished portfolio feel unreliable.

### 1. Fix the Home CTA route mismatch

**Why it matters:** a broken “Contact” path is the wrong place to lose trust.

**Check**

- Home page CTA/button route target
- route enum/constants
- any nav item using `CONTACT` vs `CONNECT`

**Likely files**

- `src/assets/data/content/home/index.js`
- route enum / constants file
- nav config files

**Done when**

- every “Contact” button and nav item routes to the same valid page
- direct navigation and refresh both work

---

### 2. Add a proper homepage meta description

**Why it matters:** your homepage is the main landing page for recruiters, links, and search previews. An empty or weak description makes the app feel unfinished.

**Check**

- `pageMetas.js`
- any SEO/head manager that expects `description`

**Likely files**

- `src/assets/data/pageMetas.js`
- `src/components/...HeadManager...` or similar

**Done when**

- Home has a strong description
- page title + OG description render correctly in head tags

**Recommended description**

> React-focused frontend engineer building polished, data-driven interfaces, developer tooling, and product systems with an emphasis on architecture, usability, and maintainability.

---

### 3. Verify every outbound link

**Why it matters:** dead links are one of the fastest ways to reduce confidence.

**Check**

- LinkedIn
- GitHub
- email/contact links
- resume download
- any “View project” / “Open demo” / “Open repo” links

**Likely files**

- `src/assets/data/content/contact/index.js`
- footer config/content
- social link config
- resume/download button component

**Done when**

- every link opens correctly
- LinkedIn slug is consistent everywhere
- GitHub URL is consistent everywhere

---

### 4. Fix stale asset/image paths

**Why it matters:** stale paths often stay invisible until a metadata component or social preview starts using them.

**Check**

- `side projects/...` vs `sideProjects/...`
- casing mismatches in asset paths
- metadata image references

**Likely files**

- `src/assets/data/projectMetas.js`
- any image registry/helper
- asset folder names under `src/assets/...`

**Done when**

- no metadata path uses stale folder names
- every referenced image resolves correctly

---

## Priority 2 — Sharpen the first impression

This is where the biggest hiring gain is now.

### 5. Replace the generic home hero title

**Why it matters:** “Overview” is too weak for the most valuable part of the site.

**Change**
Replace generic hero language with a role-first headline.

**Likely file**

- `src/assets/data/content/home/index.js`

**Recommended direction**
**Title**

> Senior React / Frontend Engineer

**Subhead**

> I build polished, data-driven product interfaces, frontend systems, and browser-based tooling with a strong focus on architecture, usability, and long-term maintainability.

**Done when**

- the first screen tells me who you are in under 3 seconds
- no generic title language remains

---

### 6. Add a proof strip near the top of Home

**Why it matters:** skimmers need fast evidence, not just a polished intro.

**Add 3–4 short proof bullets/cards**

- Sole frontend engineer on a real education platform
- Built browser-based IDE and grading workflows
- Won the Daimler trucking hackathon
- Created reusable frontend systems and technical docs

**Likely file**

- `src/assets/data/content/home/index.js`

**Done when**

- a recruiter can understand your credibility without opening another page

---

### 7. Standardize your role positioning

**Why it matters:** right now the portfolio still risks describing you in too many ways.

**Pick one dominant identity**
Best choice:

> Senior React / Frontend Engineer

Secondary supporting language can vary slightly, but your main label should not.

**Check**

- homepage
- resume page
- contact page
- page metadata
- social descriptions
- resume headline

**Likely files**

- `src/assets/data/content/home/index.js`
- `src/assets/data/content/resumeData.js`
- `src/assets/data/content/contact/index.js`
- `src/assets/data/pageMetas.js`

**Done when**

- the site describes you the same way everywhere

---

## Priority 3 — Tighten the project story

The substance is there. Now make the outcomes easier to see.

### 8. Add clearer “why it mattered” language on major project pages

**Why it matters:** your architecture explanations are strong, but outcome framing can still be stronger.

**For each major project, make sure it clearly states**

- who it served
- what problem it solved
- what you personally owned
- what changed because of the work

**Best targets**

- CodeStream
- Hackathon
- Side Projects overview

**Likely files**

- `src/assets/data/content/codestream/index.js`
- `src/assets/data/content/hackathon/index.js`
- `src/assets/data/content/side-projects/index.js`

**Done when**

- each project has a visible problem → solution → ownership → impact flow

---

### 9. Make the recruiter path more obvious

**Why it matters:** the portfolio is rich, but first-pass reviewers need a guided path.

**Recommended main journey**

- Home
- CodeStream / Professional Work
- Hackathon
- Side Projects
- Resume / Contact

**Action**

- keep Docs available
- reduce their prominence in first-pass navigation if they currently compete with your strongest work

**Likely files**

- main nav config
- sticky nav / drawer nav config
- route/page ordering data

**Done when**

- the site naturally leads people to your strongest proof first

---

## Priority 4 — Finish the SEO / sharing layer

These are small, but they help the site feel complete.

### 10. Improve social preview metadata

**Why it matters:** portfolio links should preview cleanly in Slack, LinkedIn, Discord, texts, and recruiter tools.

**Add or verify**

- Open Graph title
- Open Graph description
- Open Graph image
- Twitter card tags
- canonical URL

**Important**
Use a **PNG/JPG social image**, not only SVG.

**Likely files**

- head/SEO component
- `pageMetas.js`
- public assets folder

**Done when**

- shared links produce a strong preview card

---

### 11. Add `robots.txt` and `sitemap.xml`

**Why it matters:** easy finishing move, no downside.

**Likely location**

- `public/robots.txt`
- `public/sitemap.xml`

**Done when**

- both files exist and match your live routes

---

### 12. Add JSON-LD structured data

**Why it matters:** subtle professionalism bump.

**Recommended schemas**

- `Person`
- `WebSite`
- optionally `ProfilePage`

**Likely file**

- head/SEO component

**Done when**

- structured data is present and valid

---

## Priority 5 — Polish the UX details

### 13. Run a full route QA pass

**Why it matters:** no portfolio is “done” until every route behaves correctly.

**Test**

- desktop
- mobile
- light mode
- dark mode

**Check**

- direct page load
- refresh on subroutes
- sticky section nav
- drawer nav
- collapsible sections
- diagram rendering
- resume modal
- contact form success/error states
- missing assets
- scroll offset accuracy

**Done when**

- no visible console/runtime issues
- every route survives refresh
- no content overlaps or clipped diagrams

---

### 14. Run a keyboard and accessibility pass

**Why it matters:** your site already looks engineered. Accessibility is part of that signal.

**Check**

- visible focus states
- tab order
- button/link semantics
- alt text
- heading hierarchy
- contrast on frosted/glass sections
- reduced motion behavior
- form labels and validation feedback

**Done when**

- keyboard-only use feels deliberate, not accidental

---

### 15. Do a performance cleanup pass

**Why it matters:** rich visuals are good until they feel heavy.

**Check**

- large screenshots
- social image size
- lazy loading for non-critical media
- diagram rendering cost
- unnecessary bundle weight
- font loading
- repeated heavy blur/shadow effects on mobile

**Done when**

- home loads cleanly
- mobile feels smooth
- no obviously oversized assets

---

## Priority 6 — Final credibility pass

### 16. Remove or hide stale development artifacts

**Why it matters:** failing screenshots, stale debug assets, or leftover test-output references should never leak into anything user-facing.

**Check**

- public folder
- linked assets
- docs references
- screenshots surfaced by mistake
- build output

**Done when**

- nothing public looks like leftover internal debugging material

---

### 17. Do one final language pass for repetition

**Why it matters:** now that typos are mostly handled, the last language issue is repetition.

**Watch for overuse of**

- architecture
- systems
- scalable
- maintainable
- real-world
- polished

These words are fine. Just do not let them replace specific meaning.

**Best targets**

- homepage intro
- CodeStream summary
- side-projects overview
- resume summary

**Done when**

- each page sounds specific, not generically “professional”

---

## What might still be missing

These are not mandatory, but they would add value.

### A short availability line

A subtle line on Home or Contact:

> Open to remote senior frontend / React opportunities.

That helps employers understand the ask.

### A compact “Tech I actually use” block

Not a giant logo wall. Just a restrained credibility strip:

- React
- JavaScript
- RSuite
- Node/Express
- MongoDB
- Playwright / Jest
- Mermaid
- AWS S3

### A downloadable one-page resume that mirrors the site positioning

Only if your current downloadable resume already matches the stronger React/frontend framing.

---

# Recommended order of attack

## Must do now

1. route mismatch
2. homepage meta description
3. outbound link verification
4. stale asset path cleanup
5. home hero headline/subhead
6. proof strip near top of Home

## Then do

7. role-positioning consistency
8. project outcome framing
9. recruiter-path cleanup
10. SEO/social/share layer

## Final hardening

11. route QA pass
12. accessibility pass
13. performance pass
14. remove stale artifacts
15. repetition pass

---

# Definition of done

Call the portfolio done when:

- every route works
- every link works
- every page clearly reinforces the same role identity
- the homepage sells you in seconds
- the strongest work is easy to find
- nothing visible feels unfinished
- no one can plausibly think “nice site, but is it stable?”
