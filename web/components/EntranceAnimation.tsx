"use client"
import { useEffect, useState } from "react"
import { useDarkMode } from "@/lib/useDarkMode"

export function EntranceAnimation() {
  const { isDarkMode, isTransitioning } = useDarkMode()
  const [showFlash, setShowFlash] = useState(false)
  const [showGlitch, setShowGlitch] = useState(false)

  useEffect(() => {
    if (isTransitioning && isDarkMode) {
      // Flash effect
      setShowFlash(true)
      setTimeout(() => setShowFlash(false), 200)

      // Glitch effect
      setShowGlitch(true)
      setTimeout(() => setShowGlitch(false), 600)
    }
  }, [isTransitioning, isDarkMode])

  return (
    <>
      {/* White flash overlay */}
      {showFlash && (
        <div
          className="fixed inset-0 bg-white pointer-events-none z-[9999]"
          style={{
            animation: "flashPulse 0.2s ease-out forwards",
          }}
        />
      )}

      {/* Glitch effect */}
      {showGlitch && (
        <div
          className="fixed inset-0 pointer-events-none z-[9998] mix-blend-multiply"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(255,0,0,0.1) 0px, rgba(255,0,0,0.1) 2px, transparent 2px, transparent 4px)",
            animation: "glitchShake 0.3s ease-out",
          }}
        />
      )}

      {/* Screen shake + invert effect */}
      {showGlitch && (
        <div
          className="fixed inset-0 pointer-events-none z-[9997]"
          style={{
            animation: "screenShake 0.4s ease-out",
            filter: "invert(0.1)",
          }}
        />
      )}

      <style>{`
        @keyframes flashPulse {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes glitchShake {
          0%, 100% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(2px, -2px);
          }
          60% {
            transform: translate(-1px, 1px);
          }
          80% {
            transform: translate(1px, -1px);
          }
        }

        @keyframes screenShake {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(4px, -4px) rotate(0.5deg);
          }
          50% {
            transform: translate(-4px, 4px) rotate(-0.5deg);
          }
          75% {
            transform: translate(2px, -2px) rotate(0.2deg);
          }
        }
      `}</style>
    </>
  )
}
