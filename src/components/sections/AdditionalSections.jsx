import React from 'react'

/**
 * CertificationsSection - Add/edit/remove professional certifications.
 */
const CertificationsSection = ({ items, handlers }) => {
  const { add, update, remove } = handlers

  return (
    <div className="section-card animate-fadeIn">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">🏆</span>
          Certifications
        </h2>
        <button id="btn-add-certification" className="btn btn-primary btn-sm" onClick={add}>
          + Add Certification
        </button>
      </div>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Add professional certifications, licenses, and credentials.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="list-item">
          <div className="list-item-header">
            <span className="list-item-title">{item.name || `Certification #${index + 1}`}</span>
            <button className="btn btn-danger btn-icon btn-sm" onClick={() => remove(item.id)}>🗑️</button>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Certification Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. AWS Solutions Architect"
                value={item.name}
                onChange={(e) => update(item.id, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Issuing Organization</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Amazon Web Services"
                value={item.issuer}
                onChange={(e) => update(item.id, 'issuer', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Issue Date</label>
              <input
                type="month"
                className="form-input"
                value={item.date}
                onChange={(e) => update(item.id, 'date', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Credential URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://credential.link"
                value={item.link}
                onChange={(e) => update(item.id, 'link', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * LanguagesSection - Add/edit/remove spoken languages.
 */
const PROFICIENCY_LEVELS = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']

const LanguagesSection = ({ items, handlers }) => {
  const { add, update, remove } = handlers

  return (
    <div className="section-card animate-fadeIn">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">🌐</span>
          Languages
        </h2>
        <button id="btn-add-language" className="btn btn-primary btn-sm" onClick={add}>
          + Add Language
        </button>
      </div>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          List the languages you speak.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
        {items.map((item, index) => (
          <div key={item.id} className="list-item" style={{ margin: 0 }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Language"
                value={item.name}
                onChange={(e) => update(item.id, 'name', e.target.value)}
                style={{ flex: 1 }}
                aria-label={`Language ${index + 1} name`}
              />
              <select
                className="form-select"
                value={item.proficiency}
                onChange={(e) => update(item.id, 'proficiency', e.target.value)}
                style={{ width: 130 }}
                aria-label={`Language ${index + 1} proficiency`}
              >
                {PROFICIENCY_LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <button
                className="btn btn-danger btn-icon btn-sm"
                onClick={() => remove(item.id)}
                style={{ flexShrink: 0 }}
                aria-label={`Remove language ${item.name || index + 1}`}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * AchievementsSection - Add/edit/remove achievements.
 */
const AchievementsSection = ({ items, handlers }) => {
  const { add, update, remove } = handlers

  return (
    <div className="section-card animate-fadeIn">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">🥇</span>
          Achievements
        </h2>
        <button id="btn-add-achievement" className="btn btn-primary btn-sm" onClick={add}>
          + Add Achievement
        </button>
      </div>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Highlight your key accomplishments and awards.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="list-item">
          <div className="list-item-header">
            <span className="list-item-title">{item.title || `Achievement #${index + 1}`}</span>
            <button className="btn btn-danger btn-icon btn-sm" onClick={() => remove(item.id)}>🗑️</button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Achievement Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Hackathon Winner"
                value={item.title}
                onChange={(e) => update(item.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="month"
                className="form-input"
                value={item.date}
                onChange={(e) => update(item.id, 'date', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Brief description of the achievement…"
              value={item.description}
              onChange={(e) => update(item.id, 'description', e.target.value)}
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * InterestsSection - Add/remove personal interests and hobbies.
 */
const InterestsSection = ({ items, handlers }) => {
  const { add, update, remove } = handlers

  return (
    <div className="section-card animate-fadeIn">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">❤️</span>
          Interests & Hobbies
        </h2>
        <button id="btn-add-interest" className="btn btn-primary btn-sm" onClick={add}>
          + Add Interest
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              padding: 'var(--space-1) var(--space-3)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            <input
              type="text"
              placeholder="e.g. Photography"
              value={item.name}
              onChange={(e) => update(item.id, 'name', e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                minWidth: 80,
                maxWidth: 140,
              }}
              aria-label={`Interest ${index + 1}`}
            />
            <button
              className="btn btn-ghost"
              onClick={() => remove(item.id)}
              style={{ padding: 0, fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1 }}
              aria-label={`Remove interest ${item.name || index + 1}`}
            >
              ×
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: 'var(--space-2)' }}>
            Add your personal interests and hobbies.
          </p>
        )}
      </div>
    </div>
  )
}

/**
 * ReferencesSection - Add/remove professional references.
 */
const ReferencesSection = ({ items, handlers }) => {
  const { add, update, remove } = handlers

  return (
    <div className="section-card animate-fadeIn">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">👥</span>
          References <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: 4 }}>(Optional)</span>
        </h2>
        <button id="btn-add-reference" className="btn btn-primary btn-sm" onClick={add}>
          + Add Reference
        </button>
      </div>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Add professional references or leave blank to display "Available upon request".
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="list-item">
          <div className="list-item-header">
            <span className="list-item-title">{item.name || `Reference #${index + 1}`}</span>
            <button className="btn btn-danger btn-icon btn-sm" onClick={() => remove(item.id)}>🗑️</button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. John Smith"
                value={item.name}
                onChange={(e) => update(item.id, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Senior Manager"
                value={item.title}
                onChange={(e) => update(item.id, 'title', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Company</label>
              <input
                type="text"
                className="form-input"
                placeholder="Company name"
                value={item.company}
                onChange={(e) => update(item.id, 'company', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="reference@email.com"
                value={item.email}
                onChange={(e) => update(item.id, 'email', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export {
  CertificationsSection,
  LanguagesSection,
  AchievementsSection,
  InterestsSection,
  ReferencesSection,
}
