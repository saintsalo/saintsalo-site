"use client"
import { Lunar } from "@/components/Lunar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export const Footer = () => {
  const router = useRouter()
  const pathname = usePathname()

  const openLunar = () => {
    sessionStorage.setItem("lunarReturnTo", pathname ?? "/")
    router.push("/lunar")
  }

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
          <Link href="https://www.subvert.fm/holy-sun-opera-house" target="_blank">
            subvert
          </Link>
          <Link href="https://www.imdb.com/name/nm7953646/" target="_blank">
            imdb
          </Link>
          <Link href="/contact">contact</Link>
          <Link href="/patches">MAX/MSP Patches</Link>
        </div>
      </div>
      <button
        type="button"
        onClick={openLunar}
        aria-label="lunar"
        className="cursor-pointer border-0 bg-transparent p-0 outline-none hover:bg-transparent focus:outline-none dark:border-0 dark:bg-transparent dark:hover:bg-transparent"
      >
        <Lunar />
      </button>
    </footer>
  )
}
