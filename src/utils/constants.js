/**
 * Default/initial state for the resume data.
 * All sections start as empty so users start fresh.
 */
export const defaultResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: '',
    profilePhoto: null,
    summary: '',
  },
  education: [],
  skills: [],
  projects: [],
  experience: [],
  certifications: [],
  languages: [],
  achievements: [],
  interests: [],
  references: [],
}

/**
 * Available resume templates
 */
export const TEMPLATES = {
  MODERN: 'modern',
  MINIMAL: 'minimal',
  PROFESSIONAL: 'professional',
}

export const TEMPLATE_LABELS = {
  [TEMPLATES.MODERN]: 'Modern',
  [TEMPLATES.MINIMAL]: 'Minimal',
  [TEMPLATES.PROFESSIONAL]: 'Professional',
}

/**
 * LocalStorage key for persisting resume data
 */
export const STORAGE_KEY = 'resumeBuilderData'
export const STORAGE_TEMPLATE_KEY = 'resumeBuilderTemplate'
