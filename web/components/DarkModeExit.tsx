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

  if (!isDarkMode) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
      <button
        onClick={toggleDarkMode}
        disabled={isTransitioning}
        className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 border border-gray-600 rounded opacity-70 hover:opacity-100 disabled:opacity-50"
      >
        [Press ESC to exit]
      </button>
    </div>
  )
}
