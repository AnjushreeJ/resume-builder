import { useState, useCallback } from 'react'
import { validateResumeData } from '../utils/helpers'

/**
 * useValidation - Hook for form validation logic.
 * Tracks touched fields and validation errors.
 */
const useValidation = (resumeData) => {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  /**
   * Mark a field as touched (user has interacted with it)
   */
  const touchField = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  /**
   * Validate all fields and return whether the form is valid.
   * Also marks all fields as touched to show errors.
   */
  const validate = useCallback(() => {
    const { isValid, errors: newErrors } = validateResumeData(resumeData)
    setErrors(newErrors)
    // Mark all fields that have errors as touched
    const touchedFields = Object.keys(newErrors).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    )
    setTouched((prev) => ({ ...prev, ...touchedFields }))
    return isValid
  }, [resumeData])

  /**
   * Clear all validation errors
   */
  const clearErrors = useCallback(() => {
    setErrors({})
    setTouched({})
  }, [])

  /**
   * Get the error for a field only if it has been touched
   */
  const getFieldError = useCallback(
    (field) => (touched[field] ? errors[field] : undefined),
    [errors, touched]
  )

  return { errors, touched, touchField, validate, clearErrors, getFieldError }
}

export default useValidation
