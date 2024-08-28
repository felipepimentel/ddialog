import React, { useState } from "react"
import { cn } from "../../lib/utils"

export const Tooltip = ({ content, children, className }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-10 px-2 py-1 text-sm text-white bg-gray-800 rounded-md shadow-lg",
            "opacity-0 transition-opacity duration-300",
            isVisible && "opacity-100",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => children

export const TooltipTrigger: React.FC<React.HTMLAttributes<HTMLElement> & { asChild?: boolean }> = ({ asChild, ...props }) => {
  if (asChild) {
    return props.children as React.ReactElement
  }
  return <span {...props} />
}

export const TooltipContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md", className)} {...props} />
}
