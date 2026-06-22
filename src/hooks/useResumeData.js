import { useState, useEffect, useCallback } from 'react'
import { defaultResumeData, STORAGE_KEY, STORAGE_TEMPLATE_KEY, TEMPLATES } from '../utils/constants'
import { generateId } from '../utils/helpers'

/**
 * useResumeData - Core hook that manages all resume state.
 * Handles LocalStorage persistence, data CRUD operations, and template selection.
 */
const useResumeData = () => {
  // ─── State ──────────────────────────────────────────────────────────────────
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : defaultResumeData
    } catch {
      return defaultResumeData
    }
  })

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_TEMPLATE_KEY) || TEMPLATES.MODERN
    } catch {
      return TEMPLATES.MODERN
    }
  })

  // ─── Persistence: auto-save to LocalStorage ──────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData))
    } catch (err) {
      console.warn('Failed to save to localStorage:', err)
    }
  }, [resumeData])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_TEMPLATE_KEY, selectedTemplate)
    } catch (err) {
      console.warn('Failed to save template to localStorage:', err)
    }
  }, [selectedTemplate])

  // ─── Personal Info ────────────────────────────────────────────────────────
  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }, [])

  // ─── Generic list section helpers ─────────────────────────────────────────
  /**
   * Creates add/update/remove handlers for any array section.
   * @param {string} section - The key in resumeData (e.g., 'education')
   * @param {object} defaultItem - Default values for a new item
   */
  const createSectionHandlers = useCallback(
    (section, defaultItem) => ({
      add: () =>
        setResumeData((prev) => ({
          ...prev,
          [section]: [...prev[section], { id: generateId(), ...defaultItem }],
        })),
      update: (id, field, value) =>
        setResumeData((prev) => ({
          ...prev,
          [section]: prev[section].map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        })),
      remove: (id) =>
        setResumeData((prev) => ({
          ...prev,
          [section]: prev[section].filter((item) => item.id !== id),
        })),
      reorder: (fromIndex, toIndex) =>
        setResumeData((prev) => {
          const arr = [...prev[section]]
          const [moved] = arr.splice(fromIndex, 1)
          arr.splice(toIndex, 0, moved)
          return { ...prev, [section]: arr }
        }),
    }),
    []
  )

  // ─── Section-specific handlers ───────────────────────────────────────────
  const educationHandlers = createSectionHandlers('education', {
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
  })

  const experienceHandlers = createSectionHandlers('experience', {
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    location: '',
    description: '',
  })

  const projectHandlers = createSectionHandlers('projects', {
    title: '',
    description: '',
    technologies: '',
    link: '',
    github: '',
  })

  const certificationHandlers = createSectionHandlers('certifications', {
    name: '',
    issuer: '',
    date: '',
    link: '',
  })

  const languageHandlers = createSectionHandlers('languages', {
    name: '',
    proficiency: 'Intermediate',
  })

  const achievementHandlers = createSectionHandlers('achievements', {
    title: '',
    description: '',
    date: '',
  })

  const interestHandlers = createSectionHandlers('interests', {
    name: '',
  })

  const referenceHandlers = createSectionHandlers('references', {
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
  })

  // ─── Skills ──────────────────────────────────────────────────────────────
  const addSkill = useCallback((skill) => {
    if (!skill?.trim()) return
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: generateId(), name: skill.trim(), level: 'Intermediate' }],
    }))
  }, [])

  const updateSkill = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }))
  }, [])

  const removeSkill = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }))
  }, [])

  // ─── Reset ────────────────────────────────────────────────────────────────
  const resetData = useCallback(() => {
    setResumeData(defaultResumeData)
    setSelectedTemplate(TEMPLATES.MODERN)
  }, [])

  // ─── Return ───────────────────────────────────────────────────────────────
  return {
    resumeData,
    selectedTemplate,
    setSelectedTemplate,
    updatePersonalInfo,
    educationHandlers,
    experienceHandlers,
    projectHandlers,
    certificationHandlers,
    languageHandlers,
    achievementHandlers,
    interestHandlers,
    referenceHandlers,
    addSkill,
    updateSkill,
    removeSkill,
    resetData,
  }
}

export default useResumeData
