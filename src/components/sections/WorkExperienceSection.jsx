import React from 'react'

/**
 * WorkExperienceSection - Add/edit/remove work experience entries.
 */
const WorkExperienceSection = ({ items, handlers }) => {
  const { add, update, remove } = handlers

  return (
    <div className="section-card animate-fadeIn">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">💼</span>
          Work Experience
        </h2>
        <button id="btn-add-experience" className="btn btn-primary btn-sm" onClick={add}>
          + Add Experience
        </button>
      </div>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-3)' }}>💼</span>
          No experience added yet. Click "Add Experience" to get started.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="list-item">
          <div className="list-item-header">
            <span className="list-item-title">
              {item.position || item.company
                ? `${item.position || 'Role'} @ ${item.company || 'Company'}`
                : `Experience #${index + 1}`}
            </span>
            <button
              className="btn btn-danger btn-icon btn-sm"
              onClick={() => remove(item.id)}
              aria-label={`Remove experience entry ${index + 1}`}
            >
              🗑️
            </button>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Job Title / Position</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Software Engineer"
                value={item.position}
                onChange={(e) => update(item.id, 'position', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Google, Infosys"
                value={item.company}
                onChange={(e) => update(item.id, 'company', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Bangalore, Remote"
                value={item.location}
                onChange={(e) => update(item.id, 'location', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ justifyContent: 'flex-end', paddingTop: '1.6rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                <input
                  type="checkbox"
                  checked={item.current}
                  onChange={(e) => update(item.id, 'current', e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)', width: 16, height: 16 }}
                />
                Currently working here
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="month"
                className="form-input"
                value={item.startDate}
                onChange={(e) => update(item.id, 'startDate', e.target.value)}
              />
            </div>
            {!item.current && (
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="month"
                  className="form-input"
                  value={item.endDate}
                  onChange={(e) => update(item.id, 'endDate', e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Responsibilities & Achievements</label>
            <textarea
              className="form-textarea"
              placeholder="• Led development of…&#10;• Improved performance by X%&#10;• Collaborated with team to…"
              value={item.description}
              onChange={(e) => update(item.id, 'description', e.target.value)}
              rows={4}
            />
            <span className="form-hint">Use bullet points for best results on the resume.</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WorkExperienceSection
