'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
  className?: string
}

export function Dropdown({ trigger, children, align = 'right', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      <div
        className={cn(
          "absolute min-w-[200px] mt-2 py-2 bg-white rounded-lg border border-gray-100",
          "transition-all duration-200 origin-top",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
          align === 'right' ? 'right-0' : 'left-0',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface DropdownItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function DropdownItem({ children, className, onClick }: DropdownItemProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer",
        "transition-colors duration-150 ease-in-out",
        className
      )}
    >
      {children}
    </div>
  )
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-gray-100" />
}