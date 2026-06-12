"use client"
import { useEffect } from "react"
import { useDarkMode } from "@/lib/useDarkMode"

export function DarkModeExit() {
  const { isDarkMode, toggleDarkMode, isTransitioning } = useDarkMode()

  useEffect(() => {
    if (!isDarkMode) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isTransitioning) {
        toggleDarkMode()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isDarkMode, toggleDarkMode, isTransitioning])

  return null
}
