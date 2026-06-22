# 📄 Resume Builder

> **Build professional resumes in minutes.** — A free, feature-rich Resume Builder built with React + Vite, supporting 3 templates, live preview, PDF export, and LocalStorage persistence.

Live Tool URL:
https://resume-builder-delta-ten-30.vercel.app/

---

## ✨ Features

| Feature | Details |
|---|---|
| 👤 Personal Info | Name, email, phone, address, LinkedIn, GitHub, portfolio |
| 📸 Profile Photo | Upload and display your photo on the resume |
| 📝 Professional Summary | Rich summary text field |
| 🎓 Education | Multiple entries with institution, degree, dates, grade |
| ⚡ Skills | Unlimited skills with proficiency levels (Beginner → Expert) |
| 🚀 Projects | Title, description, technologies, demo & GitHub links |
| 💼 Work Experience | Multiple entries with current-position support |
| 🏆 Certifications | Name, issuer, date, credential URL |
| 🌐 Languages | Name + proficiency level |
| 🥇 Achievements | Title, date, description |
| ❤️ Interests | Personal hobbies & interests |
| 👥 References | Optional professional references |
| 🎨 3 Templates | Modern, Minimal, Professional |
| 👁️ Live Preview | Instant A4 resume preview as you type |
| 📥 PDF Export | Download resume as PDF (jsPDF + html2canvas) |
| 🖨️ Print | Direct browser print |
| 💾 LocalStorage | Auto-saves and restores data on page refresh |
| ✅ Validation | Required field validation with clear error messages |
| 📱 Responsive | Works on desktop, tablet, and mobile |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/AnjushreeJ/resume-builder.git
cd resume-builder

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

---

## 📁 Project Structure

```
resume-builder/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── editor/
│   │   │   └── EditorSidebar.jsx     # Left panel with tabbed form
│   │   ├── preview/
│   │   │   └── ResumePreview.jsx     # Live A4 preview panel
│   │   ├── sections/
│   │   │   ├── PersonalInfoSection.jsx
│   │   │   ├── EducationSection.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   ├── WorkExperienceSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   └── AdditionalSections.jsx  # Certs, Languages, etc.
│   │   ├── templates/
│   │   │   ├── ModernTemplate.jsx
│   │   │   ├── MinimalTemplate.jsx
│   │   │   ├── ProfessionalTemplate.jsx
│   │   │   └── TemplateHelpers.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── TemplatePicker.jsx
│   │   └── ToastContainer.jsx
│   ├── hooks/
│   │   ├── useResumeData.js          # Core state + LocalStorage
│   │   └── useValidation.js          # Form validation
│   ├── styles/
│   │   ├── index.css                 # Global design system
│   │   └── templates.css             # A4 resume template styles
│   ├── utils/
│   │   ├── constants.js              # App constants & defaults
│   │   ├── helpers.js                # Utility functions
│   │   └── pdfExport.js             # PDF generation logic
│   ├── App.jsx                       # Root component
│   └── main.jsx                      # React entry point
├── index.html
├── vite.config.js
├── package.json
├── vercel.json
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 5** | Build tool & dev server |
| **CSS3** | Styling (no frameworks) |
| **jsPDF** | PDF generation |
| **html2canvas** | DOM-to-canvas for PDF |
| **LocalStorage** | Client-side persistence |

**No backend. No database. No paid services.**

---

## 📜 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

## 👩‍💻 Author

**Anjushree J**  
📧 [anjushreej5@gmail.com](mailto:anjushreej5@gmail.com)

---

<div align="center">
  <a href="https://digitalheroesco.com" target="_blank">
    <img src="https://img.shields.io/badge/Built%20for-Digital%20Heroes-2563eb?style=for-the-badge&logo=rocket&logoColor=white" alt="Built for Digital Heroes" />
  </a>
</div>
