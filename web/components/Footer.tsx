"use client"
import { getLunarAge, getLunarIcon } from "@/lib/lunar"
import Link from "next/link"
import { useEffect, useState } from "react"

export const Footer = () => {
  const [moon, getMoon] = useState({ age: 0, percent: 0 })
  useEffect(() => {
    const interval = setInterval(() => {
      getMoon(getLunarAge())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="md:sticky bottom-0 md:h-20 items-center flex flex-row px-4 justify-between mt-20 transition-all duration-500 border-t border-white shadow-md md:py-0 py-8">
      <div className="flex flex-col items-center">
        <div className="social flex md:flex-row gap-4 flex-col">
          <Link href="https://www.instagram.com/saintsalo/" target="_blank">
            instagram
          </Link>
          <Link href="https://dlsalo.bandcamp.com/" target="_blank">
            bandcamp
          </Link>
          <Link href="https://soundcloud.com/saintsalo" target="_blank">
            soundcloud
          </Link>
          <Link href="https://www.imdb.com/name/nm7953646/" target="_blank">
            imdb
          </Link>
          <Link href="/contact">contact</Link>
          <Link href="/rnbo">MAX/MSP Patches</Link>
        </div>
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <div className="hover:text-3xl transition-all duration-500">{getLunarIcon()}</div>
        <div className="flex flex-col text-[8px] transition-all duration-500 -space-y-1">
          <span>
            <span className="font-corrected">age</span> {moon?.age}
          </span>
          <span>
            <span className="font-corrected">per</span> {moon?.percent}
          </span>
        </div>
      </div>
    </footer>
  )
}
