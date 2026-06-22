import React, { useState, useCallback } from 'react'

/**
 * Toast notification system.
 * Returns { toasts, showToast, dismissToast, ToastContainer }
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, showToast, dismissToast }
}

const ICONS = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
}

/**
 * ToastContainer - Renders floating toast notifications
 */
const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null
  return (
    <div className="toast-container no-print" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          role="alert"
        >
          <span aria-hidden="true">{ICONS[toast.type] || ICONS.info}</span>
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            style={{ fontSize: '1rem', color: 'inherit', minWidth: '28px' }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
