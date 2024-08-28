import React, { useState, useEffect } from "react"
import { cn } from "../../lib/utils"

interface ToastProps {
  title?: string
  description?: string
  action?: React.ReactNode
  duration?: number
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ title, description, action, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow time for exit animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className={cn(
      "fixed bottom-4 right-4 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-opacity duration-300",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="flex items-start p-4">
        <div className="flex-1">
          {title && <div className="font-semibold text-gray-900 dark:text-white">{title}</div>}
          {description && <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</div>}
        </div>
        {action}
        <ToastClose onClick={onClose} />
      </div>
    </div>
  )
}

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

const ToastViewport: React.FC = () => {
  return <div id="toast-viewport" />
}

const ToastClose: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    className={cn(
      "ml-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400",
      className
    )}
    {...props}
  >
    <span className="sr-only">Close</span>
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
)

export { Toast, ToastProvider, ToastViewport, ToastClose }
