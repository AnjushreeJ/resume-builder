import React from 'react'
import { formatDate, SKILL_FILL, ContactRow } from './TemplateHelpers'
import { formatDisplayUrl } from '../../utils/helpers'

/**
 * MinimalTemplate - Clean, typographic elegance. White background, 
 * single-column with subtle section dividers.
 */
const MinimalTemplate = ({ data }) => {
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
    <div className="resume-page resume-minimal">
      {/* ── Header ── */}
      <div className="header-block">
        <div className="header-left">
          <div className="full-name">{personalInfo.fullName || 'Your Name'}</div>
          <ContactRow personalInfo={personalInfo} />
        </div>
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

      {/* ── Summary ── */}
      {personalInfo.summary && (
        <div className="section">
          <div className="section-heading">About</div>
          <p className="summary-text">{personalInfo.summary}</p>
        </div>
      )}

      {/* ── Work Experience ── */}
      {hasContent(experience) && (
        <div className="section">
          <div className="section-heading">Experience</div>
          {experience.map((exp) => (
            <div key={exp.id} className="entry">
              <div className="entry-title">{exp.position}</div>
              <div className="entry-date">
                {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
              </div>
              <div className="entry-subtitle">
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </div>
              {exp.description && (
                <div className="entry-description">{exp.description}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Education ── */}
      {hasContent(education) && (
        <div className="section">
          <div className="section-heading">Education</div>
          {education.map((edu) => (
            <div key={edu.id} className="entry">
              <div className="entry-title">
                {edu.degree}{edu.field ? ` — ${edu.field}` : ''}
              </div>
              <div className="entry-date">
                {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
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

      {/* ── Projects ── */}
      {hasContent(projects) && (
        <div className="section">
          <div className="section-heading">Projects</div>
          {projects.map((proj) => (
            <div key={proj.id} className="entry" style={{ display: 'block', marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="entry-title">{proj.title}</div>
                {proj.link && (
                  <span style={{ fontSize: 9, color: '#475569' }}>{formatDisplayUrl(proj.link)}</span>
                )}
              </div>
              {proj.description && (
                <div className="entry-description" style={{ gridColumn: 'auto', marginTop: 4 }}>
                  {proj.description}
                </div>
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

      {/* ── Two column: Skills + Certifications ── */}
      {(hasContent(skills) || hasContent(certifications)) && (
        <div className="section">
          <div className="two-col">
            {hasContent(skills) && (
              <div>
                <div className="section-heading">Skills</div>
                <div className="skills-grid">
                  {skills.map((skill) => (
                    <span key={skill.id} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {hasContent(certifications) && (
              <div>
                <div className="section-heading">Certifications</div>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ marginBottom: 7, fontSize: '9.5px', color: '#374151' }}>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{cert.name}</div>
                    <div style={{ color: '#64748b', fontSize: '9px' }}>
                      {cert.issuer}{cert.date ? ` · ${formatDate(cert.date)}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Languages + Interests ── */}
      {(hasContent(languages) || hasContent(interests)) && (
        <div className="section">
          <div className="two-col">
            {hasContent(languages) && (
              <div>
                <div className="section-heading">Languages</div>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ fontSize: '9.5px', marginBottom: 4, color: '#374151' }}>
                    <strong>{lang.name}</strong>
                    {lang.proficiency ? ` — ${lang.proficiency}` : ''}
                  </div>
                ))}
              </div>
            )}
            {hasContent(interests) && (
              <div>
                <div className="section-heading">Interests</div>
                <div className="skills-grid">
                  {interests.filter(i => i.name).map((item) => (
                    <span key={item.id} className="skill-tag">{item.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Achievements ── */}
      {hasContent(achievements) && (
        <div className="section">
          <div className="section-heading">Achievements</div>
          {achievements.map((ach) => (
            <div key={ach.id} style={{ marginBottom: 8, fontSize: '9.5px' }}>
              <div style={{ fontWeight: 600, color: '#1e293b' }}>
                {ach.title}{ach.date ? ` · ${formatDate(ach.date)}` : ''}
              </div>
              {ach.description && <div style={{ color: '#374151' }}>{ach.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ── References ── */}
      {hasContent(references) ? (
        <div className="section">
          <div className="section-heading">References</div>
          <div className="two-col">
            {references.map((ref) => (
              <div key={ref.id} style={{ fontSize: '9.5px', marginBottom: 6 }}>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>{ref.name}</div>
                <div style={{ color: '#475569' }}>{ref.title}{ref.company ? `, ${ref.company}` : ''}</div>
                {ref.email && <div style={{ color: '#64748b' }}>{ref.email}</div>}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MinimalTemplate
