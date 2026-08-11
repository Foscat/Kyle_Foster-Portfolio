/**
 * @file index.jsx
 * @description First-class case study for Kyle Foster's published interface libraries.
 * @module pages/InterfaceSystem
 */

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { Footer, helpers, StickyNav, StickySectionNav } from "components/navigation";
import { PageRoute } from "types/navigation.types";
import "./styles.css";

const sections = [
  { id: "system-overview", title: "System overview", blocks: [] },
  { id: "published-packages", title: "Published packages", blocks: [] },
  { id: "ownership-model", title: "Ownership model", blocks: [] },
  { id: "implementation-proof", title: "Implementation proof", blocks: [] },
];

const packages = [
  {
    name: "layout-style-css",
    version: "3.0.1",
    layer: "Structure",
    description:
      "Responsive layout primitives, intrinsic sizing, shell topology, and orientation-aware behavior.",
    npmUrl: "https://www.npmjs.com/package/layout-style-css",
  },
  {
    name: "ui-style-kit-css",
    version: "2.2.0",
    layer: "Theme",
    description:
      "Palette-aware design tokens, typography, surface treatments, and reusable visual language.",
    npmUrl: "https://www.npmjs.com/package/ui-style-kit-css",
  },
  {
    name: "ui-style-kit-icons",
    version: "1.0.0",
    layer: "Icons",
    description:
      "A focused icon vocabulary that keeps meaning and visual weight consistent across products.",
    npmUrl: "https://www.npmjs.com/package/ui-style-kit-icons",
  },
  {
    name: "interactive-surface-css",
    version: "1.6.0",
    layer: "Behavior",
    description:
      "Accessible interaction states, focus treatment, depth, and feedback for clickable surfaces.",
    npmUrl: "https://www.npmjs.com/package/interactive-surface-css",
  },
];

const ownershipRows = [
  {
    layer: "Layout",
    owner: "layout-style-css",
    contract: "Where content sits, wraps, stacks, and responds",
  },
  {
    layer: "Paint",
    owner: "ui-style-kit-css",
    contract: "How the product looks and how themes express identity",
  },
  {
    layer: "Language",
    owner: "ui-style-kit-icons",
    contract: "How controls communicate meaning without extra copy",
  },
  {
    layer: "Interaction",
    owner: "interactive-surface-css",
    contract: "How surfaces respond to focus, hover, press, and selection",
  },
];

/**
 * Dedicated interface-system route.
 *
 * @returns {JSX.Element} Published library case study.
 */
const InterfaceSystem = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <div className="interface-page page-shell ly-wrapper ly-wrapper--wide ly-stack">
      <StickyNav activePage={PageRoute.INTERFACE_SYSTEM} />
      <header className="interface-hero" id="system-overview">
        <div className="interface-hero__copy">
          <p className="interface-eyebrow">Open source / product infrastructure</p>
          <h1>The Interface System</h1>
          <p className="interface-hero__lead">
            Four focused libraries. One coherent way to build responsive interfaces.
          </p>
          <p className="interface-hero__summary">
            I separated structure, visual identity, icon language, and interaction behavior so teams
            can evolve one concern without destabilizing the others.
          </p>
        </div>
        <dl className="interface-hero__metrics" aria-label="Interface system summary">
          <div>
            <dt>Published</dt>
            <dd>4 packages</dd>
          </div>
          <div>
            <dt>Primary use</dt>
            <dd>Responsive React products</dd>
          </div>
          <div>
            <dt>Core standard</dt>
            <dd>Accessible by default</dd>
          </div>
        </dl>
      </header>
      <div className="page-layout ly-sidebar">
        <main className="interface-main page-content app-main ly-sidebar__content">
          <section
            id="published-packages"
            className="interface-section"
            aria-label="Published packages"
          >
            <header className="interface-section__header">
              <p className="interface-eyebrow">The package set</p>
              <h2 id="published-packages-title">Small responsibilities, clear boundaries</h2>
              <p>
                Each package has one job. Together they form a portable foundation that remains
                understandable as a product grows.
              </p>
            </header>

            <div className="interface-package-grid">
              {packages.map((item, index) => (
                <article className="interface-package" key={item.name}>
                  <div key={item.id} className="interface-package__meta">
                    <span key={item.id} aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span key={item.id}>{item.layer}</span>
                  </div>
                  <h3 key={item.id}>{item.name}</h3>
                  <p key={item.id}>{item.description}</p>
                  <footer key={item.id}>
                    <span key={item.id}>v{item.version}</span>
                    <a key={item.id} href={item.npmUrl} target="_blank" rel="noreferrer">
                      View on NPM
                      <FontAwesomeIcon
                        key={item.id}
                        icon={faArrowUpRightFromSquare}
                        aria-hidden="true"
                      />
                    </a>
                  </footer>
                </article>
              ))}
            </div>
          </section>

          <section
            id="ownership-model"
            className="interface-section"
            aria-labelledby="ownership-model-title"
          >
            <header className="interface-section__header">
              <p className="interface-eyebrow">Architecture</p>
              <h2 id="ownership-model-title">A deliberate ownership model</h2>
              <p>
                The system reduces style collisions by making each layer's responsibility explicit.
              </p>
            </header>

            <div className="interface-ownership" role="table" aria-label="Library ownership model">
              {ownershipRows.map((row) => (
                <div className="interface-ownership__row" role="row" key={row.layer}>
                  <strong key={row.id} role="cell">
                    {row.layer}
                  </strong>
                  <code key={row.id} role="cell">
                    {row.owner}
                  </code>
                  <span key={row.id} role="cell">
                    {row.contract}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section
            id="implementation-proof"
            className="interface-proof"
            aria-labelledby="implementation-proof-title"
          >
            <div>
              <p className="interface-eyebrow">Applied, not theoretical</p>
              <h2 id="implementation-proof-title">See the system inside real product work</h2>
              <p>
                The portfolio and STE product interfaces exercise the same responsive, thematic, and
                interaction contracts the packages publish.
              </p>
            </div>
            <Link
              className="interface-proof__link interactive-surface"
              data-surface-variant="accent"
              data-surface-level="2"
              to={`${PageRoute.SIDE_PROJECTS}#layout-style-css`}
            >
              <span>See the system in project work</span>
              <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
            </Link>
          </section>
        </main>

        <aside className="page-sidebar ly-sidebar__side">
          <StickySectionNav pageUrl={PageRoute.INTERFACE_SYSTEM} sections={sections} />
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default InterfaceSystem;
