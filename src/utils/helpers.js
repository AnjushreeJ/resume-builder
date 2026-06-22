/**
 * Generates a unique ID for list items (education, experience, etc.)
 * Uses crypto.randomUUID if available, with a fallback for older browsers.
 */
export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback: timestamp + random string
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Validates an email address format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email) return true // Optional fields are valid when empty
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validates a URL format (for LinkedIn, GitHub, Portfolio)
 * @param {string} url
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  if (!url) return true // Optional
  try {
    new URL(url)
    return true
  } catch {
    // Allow URLs without protocol prefix (user might type "linkedin.com/in/...")
    return url.length > 3
  }
}

/**
 * Validates required resume fields
 * @param {object} resumeData
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateResumeData = (resumeData) => {
  const errors = {}
  const { personalInfo } = resumeData

  if (!personalInfo.fullName?.trim()) {
    errors.fullName = 'Full name is required'
  }

  if (!personalInfo.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(personalInfo.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!personalInfo.phone?.trim()) {
    errors.phone = 'Phone number is required'
  }

  if (personalInfo.linkedin && !isValidUrl(personalInfo.linkedin)) {
    errors.linkedin = 'Please enter a valid LinkedIn URL'
  }

  if (personalInfo.github && !isValidUrl(personalInfo.github)) {
    errors.github = 'Please enter a valid GitHub URL'
  }

  if (personalInfo.portfolio && !isValidUrl(personalInfo.portfolio)) {
    errors.portfolio = 'Please enter a valid portfolio URL'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Formats a display URL by removing protocol prefix for cleaner display
 * @param {string} url
 * @returns {string}
 */
export const formatDisplayUrl = (url) => {
  if (!url) return ''
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/**
 * Converts a file to a base64 data URL for storing in localStorage
 * @param {File} file
 * @returns {Promise<string>}
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Truncates text to a maximum length with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Debounce function to limit function call frequency
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
