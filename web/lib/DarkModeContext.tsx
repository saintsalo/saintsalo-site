"use client"
import { createContext, useState, useCallback, useEffect, ReactNode } from "react"

interface DarkModeContextType {
  isDarkMode: boolean
  isTransitioning: boolean
  toggleDarkMode: () => void
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Update HTML class when dark mode changes
  useEffect(() => {
    const htmlElement = document.documentElement
    if (isDarkMode) {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Prevent toggling while animation is in progress
  const toggleDarkMode = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsDarkMode(prev => !prev)

    // Animation duration - adjust based on your entrance animation timing
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isTransitioning])

  const value: DarkModeContextType = {
    isDarkMode,
    isTransitioning,
    toggleDarkMode,
  }

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
}
