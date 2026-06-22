import React from 'react'
import { formatDate, SKILL_FILL, LANG_DOTS, ContactRow } from './TemplateHelpers'
import { formatDisplayUrl } from '../../utils/helpers'

/**
 * ModernTemplate - Blue sidebar with circular photo, skills bars, and timeline entries.
 */
const ModernTemplate = ({ data }) => {
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
    <div className="resume-page resume-modern">
      {/* ── Sidebar ── */}
      <aside className="resume-sidebar">
        {/* Photo */}
        <div className="photo-container">
          {personalInfo.profilePhoto ? (
            <img
              src={personalInfo.profilePhoto}
              alt={personalInfo.fullName || 'Profile'}
              className="profile-photo"
            />
          ) : (
            <div className="photo-placeholder">👤</div>
          )}
        </div>

        {/* Name */}
        <div className="name-block">
          <div className="full-name">
            {personalInfo.fullName || 'Your Name'}
          </div>
        </div>

        {/* Contact Info */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Contact</div>
          {personalInfo.email && (
            <div className="contact-item">
              <span className="contact-icon">✉</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="contact-item">
              <span className="contact-icon">in</span>
              <span>{formatDisplayUrl(personalInfo.linkedin)}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="contact-item">
              <span className="contact-icon">gh</span>
              <span>{formatDisplayUrl(personalInfo.github)}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="contact-item">
              <span className="contact-icon">🌐</span>
              <span>{formatDisplayUrl(personalInfo.portfolio)}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {hasContent(skills) && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">Skills</div>
            {skills.map((skill) => (
              <div key={skill.id} className="skill-item">
                <div className="skill-name">{skill.name}</div>
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
          <div className="sidebar-section">
            <div className="sidebar-section-title">Languages</div>
            {languages.map((lang) => (
              <div key={lang.id} className="lang-item">
                <span>{lang.name}</span>
                <div className="lang-dots">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className={`lang-dot ${n <= (LANG_DOTS[lang.proficiency] || 3) ? 'filled' : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interests */}
        {hasContent(interests) && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">Interests</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {interests.map((item) =>
                item.name ? (
                  <span
                    key={item.id}
                    style={{
                      fontSize: '9px',
                      padding: '2px 7px',
                      background: 'rgba(255,255,255,0.12)',
                      borderRadius: 3,
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    {item.name}
                  </span>
                ) : null
              )}
            </div>
          </div>
        )}
      </aside>

      {/* ── Main Content ── */}
      <main className="resume-main">
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
                <div className="entry-title">{exp.position}</div>
                <div className="entry-subtitle">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                <div className="entry-meta">
                  <span>
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && <div className="entry-description">{exp.description}</div>}
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
                <div className="entry-title">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                <div className="entry-subtitle">{edu.institution}</div>
                <div className="entry-meta">
                  <span>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
                  {edu.grade && <span>Grade: {edu.grade}</span>}
                </div>
                {edu.description && <div className="entry-description">{edu.description}</div>}
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
                <div className="entry-title">{proj.title}</div>
                {proj.description && <div className="entry-description">{proj.description}</div>}
                {proj.technologies && (
                  <div className="tech-tags" style={{ marginTop: 5 }}>
                    {proj.technologies.split(',').map((tech, i) => (
                      <span key={i} className="tech-tag">{tech.trim()}</span>
                    ))}
                  </div>
                )}
                {(proj.link || proj.github) && (
                  <div className="entry-meta" style={{ marginTop: 4 }}>
                    {proj.link && <span>🔗 {formatDisplayUrl(proj.link)}</span>}
                    {proj.github && <span>gh: {formatDisplayUrl(proj.github)}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {hasContent(certifications) && (
          <div className="section">
            <div className="section-heading">Certifications</div>
            {certifications.map((cert) => (
              <div key={cert.id} className="simple-item">
                <div className="simple-item-title">{cert.name}</div>
                <div className="simple-item-sub">
                  {cert.issuer}{cert.date ? ` · ${formatDate(cert.date)}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {hasContent(achievements) && (
          <div className="section">
            <div className="section-heading">Achievements</div>
            {achievements.map((ach) => (
              <div key={ach.id} className="simple-item">
                <div className="simple-item-title">
                  {ach.title}{ach.date ? ` · ${formatDate(ach.date)}` : ''}
                </div>
                {ach.description && (
                  <div className="simple-item-sub">{ach.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {hasContent(references) ? (
          <div className="section">
            <div className="section-heading">References</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {references.map((ref) => (
                <div key={ref.id} className="simple-item">
                  <div className="simple-item-title">{ref.name}</div>
                  <div className="simple-item-sub">
                    {ref.title}{ref.company ? ` · ${ref.company}` : ''}
                  </div>
                  {ref.email && <div className="simple-item-sub">{ref.email}</div>}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default ModernTemplate
