import React from 'react'
import { TEMPLATES, TEMPLATE_LABELS } from '../utils/constants'

/**
 * TemplatePicker - Horizontal tab selector for choosing resume templates.
 * Shows template name with a live thumbnail preview indicator.
 */
const TEMPLATE_CONFIG = [
  {
    id: TEMPLATES.MODERN,
    label: TEMPLATE_LABELS[TEMPLATES.MODERN],
    icon: '🎨',
    description: 'Bold sidebar design',
    color: '#2563eb',
  },
  {
    id: TEMPLATES.MINIMAL,
    label: TEMPLATE_LABELS[TEMPLATES.MINIMAL],
    icon: '✨',
    description: 'Clean & elegant',
    color: '#0f172a',
  },
  {
    id: TEMPLATES.PROFESSIONAL,
    label: TEMPLATE_LABELS[TEMPLATES.PROFESSIONAL],
    icon: '💼',
    description: 'Classic two-column',
    color: '#1e40af',
  },
]

const TemplatePicker = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div
      style={{
        padding: 'var(--space-4) var(--space-5)',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-surface)',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 'var(--space-3)',
        }}
      >
        Template
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-2)',
        }}
        role="radiogroup"
        aria-label="Select resume template"
      >
        {TEMPLATE_CONFIG.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id
          return (
            <button
              key={tpl.id}
              id={`template-${tpl.id}`}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectTemplate(tpl.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: isSelected
                  ? `2px solid ${tpl.color}`
                  : '2px solid var(--border-color)',
                background: isSelected
                  ? `rgba(${hexToRgb(tpl.color)}, 0.1)`
                  : 'var(--bg-elevated)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Selected indicator */}
              {isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: tpl.color,
                  }}
                />
              )}
              <span style={{ fontSize: '1.25rem' }} aria-hidden="true">
                {tpl.icon}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: isSelected ? tpl.color : 'var(--text-secondary)',
                }}
              >
                {tpl.label}
              </span>
              <span
                style={{
                  fontSize: '0.625rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {tpl.description}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Helper to convert hex color to rgb for rgba usage
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '37, 99, 235'
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}

export default TemplatePicker
