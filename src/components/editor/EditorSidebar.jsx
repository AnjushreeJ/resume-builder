import React, { useState } from 'react'
import TemplatePicker from '../TemplatePicker'
import PersonalInfoSection from '../sections/PersonalInfoSection'
import EducationSection from '../sections/EducationSection'
import SkillsSection from '../sections/SkillsSection'
import WorkExperienceSection from '../sections/WorkExperienceSection'
import ProjectsSection from '../sections/ProjectsSection'
import {
  CertificationsSection,
  LanguagesSection,
  AchievementsSection,
  InterestsSection,
  ReferencesSection,
} from '../sections/AdditionalSections'

/**
 * Navigation tabs for the editor sidebar.
 * Grouped for a clean, navigable UX.
 */
const TABS = [
  { id: 'personal', label: 'Personal', icon: '👤' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'more', label: 'More', icon: '➕' },
]

/**
 * EditorSidebar - Left panel with tabbed form sections.
 */
const EditorSidebar = ({
  resumeData,
  selectedTemplate,
  onTemplateChange,
  onPersonalInfoChange,
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
  validationErrors,
  onFieldBlur,
}) => {
  const [activeTab, setActiveTab] = useState('personal')

  return (
    <div
      className="editor-sidebar no-print"
      style={{
        width: 'var(--sidebar-width)',
        minWidth: 340,
        maxWidth: 480,
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - var(--header-height))',
        flexShrink: 0,
        position: 'sticky',
        top: 'var(--header-height)',
      }}
    >
      {/* ── Template Picker ── */}
      <TemplatePicker
        selectedTemplate={selectedTemplate}
        onSelectTemplate={onTemplateChange}
      />

      {/* ── Tab Navigation ── */}
      <div
        role="tablist"
        aria-label="Resume section editor tabs"
        style={{
          display: 'flex',
          overflowX: 'auto',
          borderBottom: '1px solid var(--border-color)',
          flexShrink: 0,
          scrollbarWidth: 'none',
          padding: '0 var(--space-2)',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: 'var(--space-3) var(--space-3)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id
                ? '2px solid var(--color-primary)'
                : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--color-primary-light)' : 'var(--text-muted)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Panels (scrollable content) ── */}
      <div
        className="scroll-area"
        style={{ flex: 1, padding: 'var(--space-4)', overflowY: 'auto' }}
        role="region"
        aria-label="Editor form"
      >
        {/* Personal Info */}
        <div
          id="panel-personal"
          role="tabpanel"
          aria-labelledby="tab-personal"
          style={{ display: activeTab === 'personal' ? 'block' : 'none' }}
        >
          <PersonalInfoSection
            data={resumeData.personalInfo}
            onChange={onPersonalInfoChange}
            errors={validationErrors}
            onFieldBlur={onFieldBlur}
          />
        </div>

        {/* Work Experience */}
        <div
          id="panel-experience"
          role="tabpanel"
          aria-labelledby="tab-experience"
          style={{ display: activeTab === 'experience' ? 'block' : 'none' }}
        >
          <WorkExperienceSection
            items={resumeData.experience}
            handlers={experienceHandlers}
          />
        </div>

        {/* Education */}
        <div
          id="panel-education"
          role="tabpanel"
          aria-labelledby="tab-education"
          style={{ display: activeTab === 'education' ? 'block' : 'none' }}
        >
          <EducationSection
            items={resumeData.education}
            handlers={educationHandlers}
          />
        </div>

        {/* Skills */}
        <div
          id="panel-skills"
          role="tabpanel"
          aria-labelledby="tab-skills"
          style={{ display: activeTab === 'skills' ? 'block' : 'none' }}
        >
          <SkillsSection
            skills={resumeData.skills}
            addSkill={addSkill}
            updateSkill={updateSkill}
            removeSkill={removeSkill}
          />
        </div>

        {/* Projects */}
        <div
          id="panel-projects"
          role="tabpanel"
          aria-labelledby="tab-projects"
          style={{ display: activeTab === 'projects' ? 'block' : 'none' }}
        >
          <ProjectsSection
            items={resumeData.projects}
            handlers={projectHandlers}
          />
        </div>

        {/* More: Certifications, Languages, Achievements, Interests, References */}
        <div
          id="panel-more"
          role="tabpanel"
          aria-labelledby="tab-more"
          style={{ display: activeTab === 'more' ? 'block' : 'none' }}
        >
          <CertificationsSection
            items={resumeData.certifications}
            handlers={certificationHandlers}
          />
          <LanguagesSection
            items={resumeData.languages}
            handlers={languageHandlers}
          />
          <AchievementsSection
            items={resumeData.achievements}
            handlers={achievementHandlers}
          />
          <InterestsSection
            items={resumeData.interests}
            handlers={interestHandlers}
          />
          <ReferencesSection
            items={resumeData.references}
            handlers={referenceHandlers}
          />
        </div>
      </div>
    </div>
  )
}

export default EditorSidebar
