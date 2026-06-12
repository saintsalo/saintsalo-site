"use client"
import { useEffect, useState } from "react"
import { useDarkMode } from "@/lib/useDarkMode"

const crypticMessages = ["[[]]", "***", "~~~", "(((0)))", "§", "ªªª", "º", "ººº", "¡am¡"]

export function ParticleEffects() {
  const { isDarkMode } = useDarkMode()
  const [crypticText, setCrypticText] = useState("")
  const [showCryptic, setShowCryptic] = useState(false)

  useEffect(() => {
    if (!isDarkMode) return

    // Show random cryptic text at intervals
    const crypticInterval = setInterval(() => {
      const randomDelay = Math.random() * 8000 + 4000
      setTimeout(() => {
        const message = crypticMessages[Math.floor(Math.random() * crypticMessages.length)]
        setCrypticText(message)
        setShowCryptic(true)

        setTimeout(() => {
          setShowCryptic(false)
        }, 2500)
      }, randomDelay)
    }, 12000)

    return () => clearInterval(crypticInterval)
  }, [isDarkMode])

  return (
    <>
      {isDarkMode && showCryptic && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 text-xs md:text-xs font-mono text-black text-center"
          style={{
            animation: "crypticFade 2.5s ease-in-out forwards",
            whiteSpace: "nowrap",
          }}
        >
          {crypticText}
        </div>
      )}

      <style>{`
        @keyframes crypticFade {
          0% {
            opacity: 0;
            filter: blur(8px);
          }
          15% {
            opacity: 0.6;
            filter: blur(2px);
          }
          75% {
            opacity: 0.6;
            filter: blur(2px);
          }
          100% {
            opacity: 0;
            filter: blur(8px);
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        ${
          isDarkMode
            ? `
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
            background: radial-gradient(circle at 50% 50%, rgba(255,0,0,0.02) 0%, transparent 50%);
          }
        `
            : ``
        }
      `}</style>
    </>
  )
}
