import React from 'react'

/**
 * Footer component with developer info and the required "Built for Digital Heroes" button.
 */
const Footer = () => {
  return (
    <footer
      className="app-footer no-print"
      style={{
        background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
        borderTop: '1px solid rgba(148,163,184,0.1)',
        padding: 'var(--space-4) var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-3)',
      }}
    >
      {/* ── Developer Info ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-5)',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            Anjushree J
          </p>
          <a
            href="mailto:anjushreej5@gmail.com"
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'block',
            }}
          >
            anjushreej5@gmail.com
          </a>
        </div>

        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          © {new Date().getFullYear()} Resume Builder. All rights reserved.
        </p>
      </div>

      {/* ── Digital Heroes Button ── */}
      <a
        id="btn-digital-heroes"
        href="https://digitalheroesco.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-5)',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          color: 'white',
          borderRadius: 'var(--radius-full)',
          fontWeight: 700,
          fontSize: '0.8125rem',
          letterSpacing: '0.02em',
          boxShadow: '0 4px 16px rgba(37,99,235,0.35)',
          textDecoration: 'none',
          transition: 'all 0.25s ease',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.35)'
        }}
        aria-label="Visit Digital Heroes website"
      >
        🚀 Built for Digital Heroes
      </a>
    </footer>
  )
}

export default Footer
