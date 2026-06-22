import React from 'react'
import { formatDisplayUrl } from '../../utils/helpers'

/**
 * Shared helper to format month values (YYYY-MM) for display.
 */
export const formatDate = (dateStr, fallback = '') => {
  if (!dateStr) return fallback
  const [year, month] = dateStr.split('-')
  if (!year) return fallback
  if (!month) return year
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`
}

/**
 * Skill level to fill percentage mapping
 */
export const SKILL_FILL = {
  Beginner: 25,
  Intermediate: 55,
  Advanced: 80,
  Expert: 100,
}

/**
 * Language proficiency to dot count mapping (out of 5)
 */
export const LANG_DOTS = {
  Basic: 1,
  Intermediate: 2,
  Advanced: 3,
  Fluent: 4,
  Native: 5,
}

/**
 * Contact icons (emoji-based for universal support)
 */
export const ContactIcon = ({ type }) => {
  const icons = {
    email: '✉',
    phone: '📞',
    address: '📍',
    linkedin: 'in',
    github: 'gh',
    portfolio: '🌐',
  }
  return <span style={{ fontSize: '10px' }}>{icons[type] || '•'}</span>
}

/**
 * Renders the professional summary section
 */
export const SummaryBlock = ({ text, className }) => {
  if (!text?.trim()) return null
  return (
    <div className={`section ${className || ''}`}>
      <div className="section-heading">Summary</div>
      <p className="summary-text">{text}</p>
    </div>
  )
}

/**
 * Renders contact row items for minimal/professional templates
 */
export const ContactRow = ({ personalInfo }) => {
  const { email, phone, address, linkedin, github, portfolio } = personalInfo
  const items = [
    { type: 'email', value: email, icon: '✉' },
    { type: 'phone', value: phone, icon: '📞' },
    { type: 'address', value: address, icon: '📍' },
    { type: 'linkedin', value: formatDisplayUrl(linkedin), icon: 'LinkedIn' },
    { type: 'github', value: formatDisplayUrl(github), icon: 'GitHub' },
    { type: 'portfolio', value: formatDisplayUrl(portfolio), icon: '🌐' },
  ].filter((i) => i.value)

  return (
    <div className="contact-row">
      {items.map((item) => (
        <span key={item.type} className="contact-item">
          <span style={{ opacity: 0.6, fontSize: '8px' }}>{item.icon}</span>
          {item.value}
        </span>
      ))}
    </div>
  )
}
