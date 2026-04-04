/**
 * @file ResumeDocument.jsx
 * @description Component responsible for rendering a structured resume document based on provided data. This component takes a `resume` object as a prop, which contains all relevant information such as personal details, professional summary, experience, projects, skills, and education. The component is designed to be flexible and can handle varying levels of detail in the resume data. It uses semantic HTML elements and CSS classes for styling, allowing for easy customization and integration into different layouts (e.g., a resume preview modal or a full resume page).
 *
 * @author Foscat
 */

/**
 * @name ResumeSection
 * @description A section within the resume document, used to group related content under a common heading.
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the section.
 * @param {React.ReactNode} props.children - The content of the section.
 * @returns {JSX.Element} The rendered section component.
 */
const ResumeSection = ({ title, children }) => {
  return (
    <section className="resume-document__section">
      <div className="resume-document__section-header">
        <h3>{title}</h3>
      </div>
      <div className="resume-document__section-body">{children}</div>
    </section>
  );
};

/**
 * @name ResumeDocument
 * @description Component responsible for rendering a structured resume document based on provided data.
 * @param {Object} props - The properties object.
 * @param {Object} props.resume - The resume data object.
 * @returns {JSX.Element} The rendered resume document component.
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
                      {[item.company, item.location].filter(Boolean).join(" · ")}
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
                  {group.items.join(" • ")}
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
                      {[item.school, item.location].filter(Boolean).join(" · ")}
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
