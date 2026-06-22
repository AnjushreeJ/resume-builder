import React, { useState, useCallback } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import EditorSidebar from './components/editor/EditorSidebar'
import ResumePreview from './components/preview/ResumePreview'
import ToastContainer, { useToast } from './components/ToastContainer'
import useResumeData from './hooks/useResumeData'
import useValidation from './hooks/useValidation'
import { exportToPDF, printResume } from './utils/pdfExport'

/**
 * App - Root component that wires together:
 * - Header with actions
 * - Editor sidebar (form inputs)
 * - Resume preview (live)
 * - Footer
 * - Toast notifications
 * All state is managed in useResumeData and lifted here.
 */
const App = () => {
  const [isExporting, setIsExporting] = useState(false)
  const { toasts, showToast, dismissToast } = useToast()

  // ── Resume Data (core state) ──────────────────────────────────
  const {
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
  } = useResumeData()

  // ── Validation ────────────────────────────────────────────────
  const { errors, touchField, validate } = useValidation(resumeData)

  // ── PDF Export ────────────────────────────────────────────────
  const handleExportPDF = useCallback(async () => {
    // Validate before export
    const isValid = validate()
    if (!isValid) {
      showToast('Please fill in the required fields (name, email, phone) before exporting.', 'error')
      return
    }
    if (!resumeData.personalInfo.fullName?.trim()) {
      showToast('Please enter your name before exporting.', 'error')
      return
    }

    setIsExporting(true)
    try {
      showToast('Generating your PDF…', 'info', 2000)
      await exportToPDF('resume-preview-element', resumeData.personalInfo.fullName)
      showToast('PDF downloaded successfully! 🎉', 'success')
    } catch (err) {
      console.error('PDF export failed:', err)
      showToast('PDF export failed. Please try again.', 'error')
    } finally {
      setIsExporting(false)
    }
  }, [resumeData.personalInfo.fullName, validate, showToast])

  // ── Print ─────────────────────────────────────────────────────
  const handlePrint = useCallback(() => {
    printResume()
  }, [])

  // ── Reset ─────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      resetData()
      showToast('All data cleared. Starting fresh! 🆕', 'info')
    }
  }, [resetData, showToast])

  return (
    <div className="app">
      {/* Toast notifications (fixed position) */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* App Header */}
      <Header
        onExportPDF={handleExportPDF}
        onPrint={handlePrint}
        onReset={handleReset}
        isExporting={isExporting}
      />

      {/* Main Content */}
      <main className="app-main">
        {/* Left: Editor Sidebar */}
        <EditorSidebar
          resumeData={resumeData}
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
          onPersonalInfoChange={updatePersonalInfo}
          educationHandlers={educationHandlers}
          experienceHandlers={experienceHandlers}
          projectHandlers={projectHandlers}
          certificationHandlers={certificationHandlers}
          languageHandlers={languageHandlers}
          achievementHandlers={achievementHandlers}
          interestHandlers={interestHandlers}
          referenceHandlers={referenceHandlers}
          addSkill={addSkill}
          updateSkill={updateSkill}
          removeSkill={removeSkill}
          validationErrors={errors}
          onFieldBlur={touchField}
        />

        {/* Right: Live Preview */}
        <ResumePreview
          resumeData={resumeData}
          selectedTemplate={selectedTemplate}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
