import React, { useRef } from 'react'
import { fileToDataUrl } from '../../utils/helpers'

/**
 * PersonalInfoSection - Form for entering personal/contact details
 * and uploading a profile photo.
 */
const PersonalInfoSection = ({ data, onChange, errors = {}, onFieldBlur }) => {
  const photoInputRef = useRef(null)

  // Handle profile photo file selection
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB.')
      return
    }
    try {
      const dataUrl = await fileToDataUrl(file)
      onChange('profilePhoto', dataUrl)
    } catch {
      alert('Failed to load image. Please try again.')
    }
  }

  const handleRemovePhoto = () => {
    onChange('profilePhoto', null)
    if (photoInputRef.current) photoInputRef.current.value = ''
  }

  return (
    <div className="section-card animate-fadeIn">
      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">👤</span>
          Personal Information
        </h2>
      </div>

      {/* Profile Photo Upload */}
      <div className="form-group" style={{ alignItems: 'flex-start' }}>
        <label className="form-label">Profile Photo</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {/* Photo Preview */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'var(--bg-elevated)',
              border: '2px dashed var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onClick={() => photoInputRef.current?.click()}
          >
            {data.profilePhoto ? (
              <img
                src={data.profilePhoto}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '1.75rem', opacity: 0.5 }}>🧑</span>
            )}
          </div>

          {/* Upload Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
              aria-label="Upload profile photo"
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => photoInputRef.current?.click()}
            >
              📷 Upload Photo
            </button>
            {data.profilePhoto && (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleRemovePhoto}
              >
                🗑️ Remove
              </button>
            )}
            <p className="form-hint">JPG, PNG or GIF. Max 5MB.</p>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Name & Contact */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fullName" className="form-label required">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="e.g. Anjushree J"
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            onBlur={() => onFieldBlur?.('fullName')}
            aria-required="true"
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <span id="fullName-error" className="form-error">
              ⚠ {errors.fullName}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label required">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="e.g. you@example.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            onBlur={() => onFieldBlur?.('email')}
            aria-required="true"
          />
          {errors.email && <span className="form-error">⚠ {errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone" className="form-label required">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="e.g. +91 9876543210"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            onBlur={() => onFieldBlur?.('phone')}
            aria-required="true"
          />
          {errors.phone && <span className="form-error">⚠ {errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            id="address"
            type="text"
            className="form-input"
            placeholder="e.g. Bangalore, Karnataka"
            value={data.address}
            onChange={(e) => onChange('address', e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="linkedin" className="form-label">
            LinkedIn URL
          </label>
          <input
            id="linkedin"
            type="url"
            className="form-input"
            placeholder="https://linkedin.com/in/yourname"
            value={data.linkedin}
            onChange={(e) => onChange('linkedin', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="github" className="form-label">
            GitHub URL
          </label>
          <input
            id="github"
            type="url"
            className="form-input"
            placeholder="https://github.com/yourusername"
            value={data.github}
            onChange={(e) => onChange('github', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="portfolio" className="form-label">
          Portfolio / Website
        </label>
        <input
          id="portfolio"
          type="url"
          className="form-input"
          placeholder="https://yourportfolio.com"
          value={data.portfolio}
          onChange={(e) => onChange('portfolio', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="summary" className="form-label">
          Professional Summary
        </label>
        <textarea
          id="summary"
          className="form-textarea"
          placeholder="Write a compelling 2-3 sentence summary highlighting your expertise, experience, and key strengths…"
          value={data.summary}
          onChange={(e) => onChange('summary', e.target.value)}
          rows={4}
          style={{ minHeight: 100 }}
        />
        <span className="form-hint">{data.summary?.length || 0} characters</span>
      </div>
    </div>
  )
}

export default PersonalInfoSection
