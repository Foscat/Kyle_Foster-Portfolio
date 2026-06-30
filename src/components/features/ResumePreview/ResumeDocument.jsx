/**
 * @module src\components\features\ResumePreview\ResumeDocument
 * @file ResumeDocument.jsx
 * @description Structured resume document renderer used by the preview and PDF export flow.
 */

const buildContactItems = (resume) =>
  [
    resume.location,
    resume.email,
    resume.phone,
    resume.website,
    resume.github,
    resume.linkedin,
  ].filter(Boolean);

/**
 * @name ResumeSection
 * @description Groups related resume content under a shared heading.
 * @param {Object} props - Component props.
 * @param {string} props.title - Section title.
 * @param {React.ReactNode} props.children - Section content.
 * @returns {JSX.Element}
 */
const ResumeSection = ({ title, children }) => (
  <section className="resume-document__section">
    <div className="resume-document__section-header">
      <h3>{title}</h3>
    </div>
    <div className="resume-document__section-body">{children}</div>
  </section>
);

const ResumeEntry = ({ item, compact = false }) => {
  const subtitle = [item.company || item.subtitle || item.school, item.location, item.dates].filter(
    Boolean
  );

  return (
    <article
      className={`resume-document__entry ${compact ? "resume-document__entry--compact" : ""}`}
    >
      <div className="resume-document__entry-heading">
        <h4 className="resume-document__entry-title">
          {item.role || item.name || item.program}
          {subtitle.length ? (
            <>
              <span className="resume-document__entry-separator"> | </span>
              <span className="resume-document__entry-subtitle">{subtitle.join(" | ")}</span>
            </>
          ) : null}
        </h4>
      </div>

      {item.summary ? <p className="resume-document__entry-summary">{item.summary}</p> : null}

      {item.bullets?.length ? (
        <ul className="resume-document__bullet-list">
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {item.notes?.length ? (
        <ul className="resume-document__bullet-list">
          {item.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

/**
 * @name ResumeDocument
 * @description Renders resume content as semantic, printable markup.
 * @param {Object} props - Component props.
 * @param {Object} props.resume - Resume data object.
 * @returns {JSX.Element}
 */
const ResumeDocument = ({ resume }) => {
  const {
    name,
    title,
    summary,
    footer,
    experience = [],
    projects = [],
    skills = [],
    education = [],
  } = resume;
  const contactItems = buildContactItems(resume);

  return (
    <div className="resume-document">
      <header className="resume-document__header">
        <h1 className="resume-document__name">{name}</h1>
        <p className="resume-document__role">{title}</p>

        {contactItems.length ? (
          <p className="resume-document__meta">
            {contactItems.map((item) => (
              <span key={item} className="resume-document__meta-item">
                {item}
              </span>
            ))}
          </p>
        ) : null}
      </header>
      {summary ? (
        <ResumeSection title="Professional Summary">
          <p className="resume-document__summary">{summary}</p>
        </ResumeSection>
      ) : null}
      {experience.length ? (
        <ResumeSection title="Professional Experience">
          <div className="resume-document__stack">
            {experience.map((item) => (
              <ResumeEntry key={item.id || `${item.company}-${item.role}`} item={item} />
            ))}
          </div>
        </ResumeSection>
      ) : null}
      {projects.length ? (
        <ResumeSection title="Selected Technical Projects">
          <div className="resume-document__stack resume-document__stack--compact">
            {projects.map((item) => (
              <ResumeEntry key={item.id || item.name} item={item} compact />
            ))}
          </div>
        </ResumeSection>
      ) : null}
      {skills.length ? (
        <ResumeSection title="Technical Skills">
          <div className="resume-document__skills">
            {skills.map((group) => (
              <div key={group.id || group.label} className="resume-document__skill-group">
                <p className="resume-document__skill-label">{group.label}</p>
                <p className="resume-document__skill-values">{group.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </ResumeSection>
      ) : null}
      {education.length ? (
        <ResumeSection title="Education">
          <div className="resume-document__stack resume-document__stack--compact">
            {education.map((item) => (
              <ResumeEntry key={item.id || `${item.school}-${item.program}`} item={item} compact />
            ))}
          </div>
        </ResumeSection>
      ) : null}
      {footer ? <footer className="resume-document__footer">{footer}</footer> : null}
    </div>
  );
};

export { ResumeDocument, ResumeSection };
