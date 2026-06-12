"use client"
import { useEffect, useState } from "react"
import { useDarkMode } from "@/lib/useDarkMode"

export function TextAnimations() {
  const { isDarkMode } = useDarkMode()
  const [glitchElement, setGlitchElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!isDarkMode) return

    // Trigger occasional random glitches
    const glitchInterval = setInterval(() => {
      // Get all text nodes
      const allElements = document.querySelectorAll("p, span, div, h1, h2, h3, h4, h5, h6, a, li")
      
      if (allElements.length === 0) return

      // Pick a random element
      const randomIndex = Math.floor(Math.random() * allElements.length)
      const element = allElements[randomIndex] as HTMLElement

      // Don't glitch interactive elements or hidden ones
      if (element.tagName === "BUTTON" || element.offsetHeight === 0) return

      // Add glitch class
      element.classList.add("glitch-single")
      setGlitchElement(element)

      // Remove after animation completes
      setTimeout(() => {
        element.classList.remove("glitch-single")
      }, 400)
    }, 2500) // Trigger every 2.5 seconds

    return () => clearInterval(glitchInterval)
  }, [isDarkMode])

  return (
    <>
      <style>{`
        ${
          isDarkMode
            ? `
          @keyframes glitchSingle {
            0% {
              transform: translate(0);
              opacity: 1;
            }
            25% {
              transform: translate(-2px, 1px);
              opacity: 0.8;
            }
            50% {
              transform: translate(2px, -1px);
              opacity: 0.6;
            }
            75% {
              transform: translate(-1px, 0);
              opacity: 0.8;
            }
            100% {
              transform: translate(0);
              opacity: 1;
            }
          }

          body .glitch-single {
            animation: glitchSingle 0.4s ease-out forwards;
          }
        `
            : ``
        }
      `}</style>
    </>
  )
}
