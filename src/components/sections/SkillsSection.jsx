import React, { useState, useRef } from 'react'

/**
 * SkillsSection - Add/remove skills with optional proficiency level.
 * Supports quick keyboard entry (Enter to add) and chip display.
 */
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

const LEVEL_COLORS = {
  Beginner: { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8', fill: 25 },
  Intermediate: { bg: 'rgba(37,99,235,0.15)', color: '#60a5fa', fill: 55 },
  Advanced: { bg: 'rgba(16,185,129,0.15)', color: '#34d399', fill: 80 },
  Expert: { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', fill: 100 },
}

const SkillsSection = ({ skills, addSkill, updateSkill, removeSkill }) => {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  const handleAdd = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    addSkill(trimmed)
    setInputValue('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="section-card animate-fadeIn">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">⚡</span>
          Skills
        </h2>
        <span className="badge badge-blue">{skills.length} skills</span>
      </div>

      {/* Quick add input */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <input
          ref={inputRef}
          id="skill-input"
          type="text"
          className="form-input"
          placeholder="Type a skill and press Enter (e.g. React, Python)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Add a new skill"
          style={{ flex: 1 }}
        />
        <button
          id="btn-add-skill"
          className="btn btn-primary"
          onClick={handleAdd}
          disabled={!inputValue.trim()}
          style={{ flexShrink: 0 }}
        >
          + Add
        </button>
      </div>

      {/* Skill chips */}
      {skills.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-6)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
          }}
        >
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-2)' }}>
            ⚡
          </span>
          Add your technical and soft skills above.
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            maxHeight: 280,
            overflowY: 'auto',
          }}
        >
          {skills.map((skill) => {
            const levelStyle = LEVEL_COLORS[skill.level] || LEVEL_COLORS.Intermediate
            return (
              <div
                key={skill.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  animation: 'fadeIn 0.2s ease forwards',
                }}
              >
                {/* Skill name */}
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                  aria-label={`Skill name: ${skill.name}`}
                />

                {/* Level selector */}
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                  style={{
                    background: levelStyle.bg,
                    color: levelStyle.color,
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2px 6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                  aria-label={`${skill.name} proficiency level`}
                >
                  {SKILL_LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>

                {/* Remove button */}
                <button
                  className="btn btn-ghost btn-icon"
                  onClick={() => removeSkill(skill.id)}
                  style={{ fontSize: '0.875rem', color: 'var(--color-danger)', flexShrink: 0 }}
                  aria-label={`Remove skill ${skill.name}`}
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      )}

      <p className="form-hint" style={{ marginTop: 'var(--space-3)' }}>
        💡 Press Enter or comma to quickly add multiple skills
      </p>
    </div>
  )
}

export default SkillsSection
