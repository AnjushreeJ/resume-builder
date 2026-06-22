import React from 'react'

/**
 * Header component with app branding and action buttons.
 * Displays "Resume Builder" title, subtitle, and toolbar actions.
 */
const Header = ({ onExportPDF, onPrint, onReset, isExporting }) => {
  return (
    <header
      className="app-header no-print"
      style={{
        background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
        borderBottom: '1px solid rgba(148,163,184,0.1)',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--space-6)',
        gap: 'var(--space-4)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* ── Brand ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flex: 1 }}>
        <div
          style={{
            width: 42,
            height: 42,
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          📄
        </div>
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #f1f5f9, #93c5fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.15,
            }}
          >
            Resume Builder
          </h1>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            Build professional resumes in minutes.
          </p>
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div
        className="toolbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
        }}
      >
        {/* Reset */}
        <button
          id="btn-reset"
          className="btn btn-secondary btn-sm"
          onClick={onReset}
          title="Clear all data and start fresh"
          aria-label="Reset all resume data"
          style={{ gap: 'var(--space-2)' }}
        >
          🔄 Reset
        </button>

        {/* Print */}
        <button
          id="btn-print"
          className="btn btn-secondary btn-sm"
          onClick={onPrint}
          title="Print resume"
          aria-label="Print resume"
        >
          🖨️ Print
        </button>

        {/* PDF Export */}
        <button
          id="btn-export-pdf"
          className="btn btn-primary btn-sm"
          onClick={onExportPDF}
          disabled={isExporting}
          aria-label="Export resume as PDF"
          style={{ minWidth: 130 }}
        >
          {isExporting ? (
            <>
              <span className="spinner" style={{ width: 14, height: 14 }} />
              Exporting…
            </>
          ) : (
            <>📥 Export PDF</>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
