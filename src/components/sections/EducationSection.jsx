import React from 'react'

/**
 * EducationSection - Add/edit/remove education entries.
 */
const EducationSection = ({ items, handlers }) => {
  const { add, update, remove } = handlers

  return (
    <div className="section-card animate-fadeIn">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">🎓</span>
          Education
        </h2>
        <button
          id="btn-add-education"
          className="btn btn-primary btn-sm"
          onClick={add}
        >
          + Add Education
        </button>
      </div>

      {items.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-8)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
          }}
        >
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-3)' }}>
            🎓
          </span>
          No education entries yet. Click "Add Education" to start.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="list-item">
          <div className="list-item-header">
            <span className="list-item-title">
              {item.institution || item.degree
                ? `${item.degree || 'Degree'} - ${item.institution || 'Institution'}`
                : `Education #${index + 1}`}
            </span>
            <div className="list-item-actions">
              <button
                className="btn btn-danger btn-icon btn-sm"
                onClick={() => remove(item.id)}
                title="Remove this entry"
                aria-label={`Remove education entry ${index + 1}`}
              >
                🗑️
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Institution / University</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. MIT, IIT Bombay"
                value={item.institution}
                onChange={(e) => update(item.id, 'institution', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Degree</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. B.Tech, MBA, B.Sc"
                value={item.degree}
                onChange={(e) => update(item.id, 'degree', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Field of Study</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Computer Science"
                value={item.field}
                onChange={(e) => update(item.id, 'field', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Grade / GPA</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 9.2 CGPA, First Class"
                value={item.grade}
                onChange={(e) => update(item.id, 'grade', e.target.value)}
              />
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
            <div className="form-group">
              <label className="form-label">End Date (or Expected)</label>
              <input
                type="month"
                className="form-input"
                value={item.endDate}
                onChange={(e) => update(item.id, 'endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Details</label>
            <textarea
              className="form-textarea"
              placeholder="Relevant coursework, honors, clubs, achievements…"
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

export default EducationSection
