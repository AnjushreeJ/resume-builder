import React from 'react'

/**
 * ProjectsSection - Add/edit/remove portfolio projects.
 */
const ProjectsSection = ({ items, handlers }) => {
  const { add, update, remove } = handlers

  return (
    <div className="section-card animate-fadeIn">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">🚀</span>
          Projects
        </h2>
        <button id="btn-add-project" className="btn btn-primary btn-sm" onClick={add}>
          + Add Project
        </button>
      </div>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-3)' }}>🚀</span>
          Showcase your best work by adding projects.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="list-item">
          <div className="list-item-header">
            <span className="list-item-title">
              {item.title || `Project #${index + 1}`}
            </span>
            <button
              className="btn btn-danger btn-icon btn-sm"
              onClick={() => remove(item.id)}
              aria-label={`Remove project ${index + 1}`}
            >
              🗑️
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. E-Commerce Platform"
              value={item.title}
              onChange={(e) => update(item.id, 'title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Describe the project, your role, and what problem it solves…"
              value={item.description}
              onChange={(e) => update(item.id, 'description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technologies Used</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. React, Node.js, MongoDB, AWS"
              value={item.technologies}
              onChange={(e) => update(item.id, 'technologies', e.target.value)}
            />
            <span className="form-hint">Separate with commas</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Live Demo Link</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://myproject.com"
                value={item.link}
                onChange={(e) => update(item.id, 'link', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub Repo Link</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://github.com/user/repo"
                value={item.github}
                onChange={(e) => update(item.id, 'github', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsSection
