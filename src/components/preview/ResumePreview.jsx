import React, { useState, useEffect, useRef } from 'react'
import { TEMPLATES } from '../../utils/constants'
import ModernTemplate from '../templates/ModernTemplate'
import MinimalTemplate from '../templates/MinimalTemplate'
import ProfessionalTemplate from '../templates/ProfessionalTemplate'
import '../../styles/templates.css'

/**
 * ResumePreview - Right panel that shows the live resume preview.
 * Scales the A4 resume to fit the available viewport space.
 */
const ResumePreview = ({ resumeData, selectedTemplate }) => {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(0.6)

  // Dynamically compute the scale factor to fit the A4 page in the container
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.clientWidth - 48 // padding
      // A4 width in pixels at 96dpi ≈ 794px (210mm)
      const a4WidthPx = 794
      const newScale = Math.min(containerWidth / a4WidthPx, 1)
      setScale(Math.max(newScale, 0.3))
    }

    updateScale()
    const ro = new ResizeObserver(updateScale)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Select the correct template component
  const TemplateComponent = {
    [TEMPLATES.MODERN]: ModernTemplate,
    [TEMPLATES.MINIMAL]: MinimalTemplate,
    [TEMPLATES.PROFESSIONAL]: ProfessionalTemplate,
  }[selectedTemplate] || ModernTemplate

  return (
    <div
      ref={containerRef}
      className="preview-container scroll-area"
      style={{
        flex: 1,
        background: '#0d1526',
        padding: 'var(--space-6)',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Preview label */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#10b981',
              display: 'inline-block',
              boxShadow: '0 0 6px rgba(16,185,129,0.6)',
              animation: 'pulse 2s infinite',
            }}
          />
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Live Preview
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>A4 · PDF ready</span>
      </div>

      {/* A4 Resume Page */}
      <div
        className="resume-preview-wrapper"
        style={{
          width: 794, // A4 at 96dpi
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `calc((794px * ${scale} - 794px) * 0.5)`,
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.6), 0 4px 24px rgba(37, 99, 235, 0.1)',
          borderRadius: 4,
          flexShrink: 0,
        }}
      >
        {/* This element is captured for PDF export */}
        <div id="resume-preview-element">
          <TemplateComponent data={resumeData} />
        </div>
      </div>

      {/* Bottom spacer for scroll */}
      <div style={{ height: `calc(${Math.max(0, 1 - scale) * 1130}px + 48px)`, flexShrink: 0 }} />
    </div>
  )
}

export default ResumePreview
