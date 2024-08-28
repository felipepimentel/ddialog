"use client"

import React, { useState, useEffect, useRef } from 'react'
import { cn } from "../../lib/utils"

interface SheetProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export const Sheet: React.FC<SheetProps> = ({ children, isOpen, onClose, side = 'right' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const sideClasses = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  }

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      )}
      <div
        ref={sheetRef}
        className={cn(
          "fixed z-50 bg-white dark:bg-gray-800 p-6 shadow-lg transition-transform duration-300 ease-in-out",
          sideClasses[side],
          isOpen ? "translate-x-0" : side === 'left' ? "-translate-x-full" : "translate-x-full"
        )}
      >
        {children}
      </div>
    </>
  )
}

export const SheetTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} />
}

export const SheetContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("h-full", className)} {...props} />
}

export const SheetFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('mt-6', className)} {...props} />
)

export const SheetTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 className={cn('text-lg font-semibold', className)} {...props} />
)

export const SheetDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn('text-sm text-gray-500', className)} {...props} />
)
