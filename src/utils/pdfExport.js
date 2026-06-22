/**
 * PDF Export utility using jsPDF and html2canvas.
 * Captures the resume preview element and exports it as a PDF.
 */

/**
 * Exports the resume preview element as a downloadable PDF file.
 * @param {string} elementId - The DOM id of the resume preview container
 * @param {string} fileName - The filename for the downloaded PDF
 * @returns {Promise<void>}
 */
export const exportToPDF = async (elementId, fileName = 'resume') => {
  // Dynamically import to keep initial bundle size small
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ])

  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`)
  }

  // Temporarily make it full-size for capture
  const originalStyle = element.style.cssText
  element.style.transform = 'scale(1)'
  element.style.transformOrigin = 'top left'

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    const imgData = canvas.toDataURL('image/jpeg', 0.95)
    
    // A4 dimensions in mm
    const pdfWidth = 210
    const pdfHeight = 297
    
    // Calculate the image dimensions to fit A4
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    const pdf = new jsPDF({
      orientation: imgHeight > pdfHeight ? 'portrait' : 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // If content is longer than one page, add multiple pages
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    pdf.save(`${safeFileName}_resume.pdf`)
  } finally {
    // Restore original styles
    element.style.cssText = originalStyle
  }
}

/**
 * Triggers the browser's print dialog for the resume.
 * Uses a print-specific stylesheet for clean output.
 */
export const printResume = () => {
  window.print()
}
