"use client"
import { getLunarAge, getLunarIcon } from "@/lib/lunar"
import { useEffect, useState } from "react"

export const Lunar = ({ standalone = false }: { standalone?: boolean }) => {
  const [moon, setMoon] = useState({ age: 0, percent: 0 })
  const [moonIcon, setMoonIcon] = useState<React.ReactNode>(null)
  useEffect(() => {
    const update = () => {
      setMoon(getLunarAge())
      setMoonIcon(getLunarIcon())
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`flex flex-row space-x-2 items-center ${standalone ? "scale-[3]" : ""}`}
    >
      <div
        className={`transition-all duration-500 ${
          standalone ? "text-4xl md:text-8xl" : "hover:text-3xl"
        }`}
      >
        {moonIcon}
      </div>
      <div className="flex flex-col text-[8px] transition-all duration-500 -space-y-1">
        <span>
          <span className="font-corrected">age</span> {moon?.age}
        </span>
        <span>
          <span className="font-corrected">per</span> {moon?.percent}
        </span>
      </div>
    </div>
  )
}
