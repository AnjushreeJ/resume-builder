import React from 'react'
import { formatDate, SKILL_FILL, LANG_DOTS, ContactRow } from './TemplateHelpers'
import { formatDisplayUrl } from '../../utils/helpers'

/**
 * ProfessionalTemplate - Dark header, two-column body.
 * Main: experience, education, projects.
 * Aside: skills, languages, certs, achievements.
 */
const ProfessionalTemplate = ({ data }) => {
  const {
    personalInfo,
    education,
    skills,
    projects,
    experience,
    certifications,
    languages,
    achievements,
    interests,
    references,
  } = data

  const hasContent = (arr) => arr && arr.length > 0

  return (
    <div className="resume-page resume-professional">
      {/* ── Dark Header ── */}
      <header className="pro-header">
        {personalInfo.profilePhoto ? (
          <img
            src={personalInfo.profilePhoto}
            alt={personalInfo.fullName || 'Profile'}
            className="profile-photo"
          />
        ) : (
          <div className="photo-placeholder">👤</div>
        )}
        <div className="pro-header-info">
          <div className="full-name">{personalInfo.fullName || 'Your Name'}</div>
          <ContactRow personalInfo={personalInfo} />
        </div>
      </header>

      {/* ── Two Column Body ── */}
      <div className="pro-body">
        {/* ── Main Column ── */}
        <main className="pro-main">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="section">
              <div className="section-heading">Professional Summary</div>
              <p className="summary-text">{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {hasContent(experience) && (
            <div className="section">
              <div className="section-heading">Work Experience</div>
              {experience.map((exp) => (
                <div key={exp.id} className="entry">
                  <div className="entry-header">
                    <div className="entry-title">{exp.position}</div>
                    <div className="entry-date">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="entry-subtitle">
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div className="entry-description">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {hasContent(education) && (
            <div className="section">
              <div className="section-heading">Education</div>
              {education.map((edu) => (
                <div key={edu.id} className="entry">
                  <div className="entry-header">
                    <div className="entry-title">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </div>
                    <div className="entry-date">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </div>
                  </div>
                  <div className="entry-subtitle">
                    {edu.institution}{edu.grade ? ` · ${edu.grade}` : ''}
                  </div>
                  {edu.description && (
                    <div className="entry-description">{edu.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {hasContent(projects) && (
            <div className="section">
              <div className="section-heading">Projects</div>
              {projects.map((proj) => (
                <div key={proj.id} className="entry">
                  <div className="entry-header">
                    <div className="entry-title">{proj.title}</div>
                    {proj.link && (
                      <div className="entry-date">{formatDisplayUrl(proj.link)}</div>
                    )}
                  </div>
                  {proj.description && (
                    <div className="entry-description">{proj.description}</div>
                  )}
                  {proj.technologies && (
                    <div className="tech-tags">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="tech-tag">{tech.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {hasContent(references) && (
            <div className="section">
              <div className="section-heading">References</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {references.map((ref) => (
                  <div key={ref.id} className="entry" style={{ marginBottom: 0 }}>
                    <div className="entry-title">{ref.name}</div>
                    <div className="entry-subtitle">{ref.title}{ref.company ? `, ${ref.company}` : ''}</div>
                    {ref.email && <div style={{ fontSize: '9px', color: '#64748b' }}>{ref.email}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* ── Aside Column ── */}
        <aside className="pro-aside">
          {/* Skills */}
          {hasContent(skills) && (
            <div className="section">
              <div className="aside-heading">Skills</div>
              {skills.map((skill) => (
                <div key={skill.id} className="skill-item">
                  <div className="skill-name">
                    <span>{skill.name}</span>
                    <span style={{ fontSize: '8px', color: '#94a3b8' }}>{skill.level}</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{ width: `${SKILL_FILL[skill.level] || 55}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {hasContent(languages) && (
            <div className="section">
              <div className="aside-heading">Languages</div>
              {languages.map((lang) => (
                <div key={lang.id} className="lang-item">
                  <span style={{ fontSize: '9.5px', color: '#374151' }}>{lang.name}</span>
                  <span className="lang-level">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {hasContent(certifications) && (
            <div className="section">
              <div className="aside-heading">Certifications</div>
              {certifications.map((cert) => (
                <div key={cert.id} className="aside-item">
                  <div className="aside-item-title">{cert.name}</div>
                  <div className="aside-item-sub">
                    {cert.issuer}{cert.date ? ` · ${formatDate(cert.date)}` : ''}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {hasContent(achievements) && (
            <div className="section">
              <div className="aside-heading">Achievements</div>
              {achievements.map((ach) => (
                <div key={ach.id} className="aside-item">
                  <div className="aside-item-title">{ach.title}</div>
                  {ach.description && (
                    <div className="aside-item-sub">{ach.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Interests */}
          {hasContent(interests) && (
            <div className="section">
              <div className="aside-heading">Interests</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {interests.filter(i => i.name).map((item) => (
                  <span
                    key={item.id}
                    style={{
                      fontSize: '9px',
                      padding: '2px 7px',
                      background: '#eff6ff',
                      color: '#1e40af',
                      borderRadius: 3,
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default ProfessionalTemplate
