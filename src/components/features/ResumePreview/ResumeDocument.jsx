/**
 * @module src\components\features\ResumePreview\ResumeDocument
 * @file ResumeDocument.jsx
 * @description Structured resume document renderer used by the preview and PDF export flow.
 */

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
    location,
    email,
    phone,
    website,
    summary,
    experience = [],
    projects = [],
    skills = [],
    education = [],
  } = resume;

  return (
    <div className="resume-document">
      <header className="resume-document__header">
        <div className="resume-document__identity">
          <h1 className="resume-document__name">{name}</h1>
          <p className="resume-document__role">{title}</p>
        </div>

        <div className="resume-document__meta">
          {[location, email, phone, website].filter(Boolean).map((item) => (
            <span key={item} className="resume-document__meta-item">
              {item}
            </span>
          ))}
        </div>
      </header>
      {summary ? (
        <ResumeSection title="Professional Summary">
          <p className="resume-document__summary">{summary}</p>
        </ResumeSection>
      ) : null}
      {experience.length ? (
        <ResumeSection title="Experience">
          <div className="resume-document__stack">
            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}-${item.dates}`}
                className="resume-document__entry"
              >
                <div key={item.id} className="resume-document__entry-topline">
                  <div key={item.id}>
                    <h4 key={item.id} className="resume-document__entry-title">
                      {item.role}
                    </h4>
                    <p key={item.id} className="resume-document__entry-subtitle">
                      {[item.company, item.location].filter(Boolean).join(" | ")}
                    </p>
                  </div>
                  <p key={item.id} className="resume-document__entry-dates">
                    {item.dates}
                  </p>
                </div>

                {item.summary ? (
                  <p key={item.id} className="resume-document__entry-summary">
                    {item.summary}
                  </p>
                ) : null}

                {item.bullets?.length ? (
                  <ul key={item.id} className="resume-document__bullet-list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </ResumeSection>
      ) : null}
      {projects.length ? (
        <ResumeSection title="Selected Projects">
          <div className="resume-document__stack">
            {projects.map((item) => (
              <article
                key={`${item.name}-${item.dates || item.subtitle || ""}`}
                className="resume-document__entry"
              >
                <div key={item.id} className="resume-document__entry-topline">
                  <div key={item.id}>
                    <h4 key={item.id} className="resume-document__entry-title">
                      {item.name}
                    </h4>
                    {item.subtitle ? (
                      <p key={item.id} className="resume-document__entry-subtitle">
                        {item.subtitle}
                      </p>
                    ) : null}
                  </div>
                  {item.dates ? (
                    <p key={item.id} className="resume-document__entry-dates">
                      {item.dates}
                    </p>
                  ) : null}
                </div>

                {item.summary ? (
                  <p key={item.id} className="resume-document__entry-summary">
                    {item.summary}
                  </p>
                ) : null}

                {item.bullets?.length ? (
                  <ul key={item.id} className="resume-document__bullet-list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </ResumeSection>
      ) : null}
      {skills.length ? (
        <ResumeSection title="Skills">
          <div className="resume-document__skills">
            {skills.map((group) => (
              <div key={group.label} className="resume-document__skill-group">
                <p key={group.id} className="resume-document__skill-label">
                  {group.label}
                </p>
                <p key={group.id} className="resume-document__skill-values">
                  {group.items.join(" | ")}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>
      ) : null}
      {education.length ? (
        <ResumeSection title="Education">
          <div className="resume-document__stack">
            {education.map((item) => (
              <article
                key={`${item.school}-${item.program}-${item.dates || ""}`}
                className="resume-document__entry"
              >
                <div key={item.id} className="resume-document__entry-topline">
                  <div key={item.id}>
                    <h4 key={item.id} className="resume-document__entry-title">
                      {item.program}
                    </h4>
                    <p key={item.id} className="resume-document__entry-subtitle">
                      {[item.school, item.location].filter(Boolean).join(" | ")}
                    </p>
                  </div>
                  {item.dates ? (
                    <p key={item.id} className="resume-document__entry-dates">
                      {item.dates}
                    </p>
                  ) : null}
                </div>

                {item.notes?.length ? (
                  <ul key={item.id} className="resume-document__bullet-list">
                    {item.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </ResumeSection>
      ) : null}
    </div>
  );
};

export { ResumeDocument, ResumeSection };
