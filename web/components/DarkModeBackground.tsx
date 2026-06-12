"use client"
import { useDarkMode } from "@/lib/useDarkMode"
import dynamic from "next/dynamic"

const AsciiSun = dynamic(() => import("@/app/sun/AsciiSun"), { ssr: false })

export function DarkModeBackground() {
  const { isDarkMode } = useDarkMode()

  if (!isDarkMode) return null

  return (
    <div
      className="fixed inset-0 z-0 bg-black"
      style={{
        pointerEvents: "none",
      }}
    >
      <AsciiSun hideControls />
    </div>
  )
}
