"use client"
import Image from "next/image"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useState } from "react"
import { HiXMark, HiOutlineBars3 } from "react-icons/hi2"
import { useDarkMode } from "@/lib/useDarkMode"

interface NavItem {
  name: string | React.ReactNode
  href: string
  tab?: boolean
  prefix?: string
}

const links: NavItem[] = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "music",
    href: "/music",
  },
  {
    name: "projects and collaborators",
    href: "/projects",
  },
  {
    name: "performances",
    href: "/performances",
  },
  {
    name: "store",
    href: "/store",
  },
]

export const Header = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { toggleDarkMode, isTransitioning } = useDarkMode()

  return (
    <nav>
      <div className="mx-auto w-full  md:rounded-sm md:p-4 md:mb-8 ">
        <div className="relative flex min-h-[70px] items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden w-full">
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              className="items-center justify-center rounded-md p-2 border-none flex flex-row w-full"
            >
              <span className="sr-only">Open main menu</span>
              <div className="grow">
                {open ? (
                  <HiXMark className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <HiOutlineBars3 className="block h-6 w-6" aria-hidden="true" />
                )}
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <Image
                  alt="dl salo music"
                  src="/images/dl-salo-profile-image.png"
                  width="20"
                  height="20"
                  className="md:m-auto md:float-left mb-2 transition-all duration-500"
                />

                <div>dl salo</div>
              </div>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <div className="mb-4 md:flex-row flex-col w-full transition-all duration-500 hidden md:flex">
              <ul className="grow self-center">
                {links &&
                  links.map((link, index) => (
                    <li key={index}>
                      <Link
                        className={clsx("md:text-xl text-lg", {
                          "text-red-400 font-corrected": pathname === link.href,
                          "font-sans": pathname !== link.href,
                        })}
                        href={link.href}
                        target={link?.tab ? `_blank` : `_self`}
                      >
                        {link.prefix ?? "======"} {link.name}
                      </Link>
                      {link.href === "/music" && (
                        <Link
                          className={clsx("md:text-xl text-lg ml-4", {
                            "text-red-400 font-corrected": pathname === "/timeline",
                            "font-sans": pathname !== "/timeline",
                          })}
                          href="/timeline"
                        >
                          == timeline
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
              <div className="mr-2 mt-8 md:mt-0 self-center">
                <button
                  onClick={toggleDarkMode}
                  disabled={isTransitioning}
                  className="border-0 bg-transparent p-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300"
                  aria-label="Toggle dark mode"
                  title="Click to enter dark mode"
                >
                  <Image
                    alt="dl salo music"
                    src="/images/dl-salo-profile-image.png"
                    width="200"
                    height="200"
                    className="md:m-auto md:float-left mb-2 blur-xs hover:blur-none transition-all duration-500"
                  />
                </button>
              </div>
              <div className="flex flex-col md:mt-0 self-center">
                <div className="flex md:flex-row flex-col items-center space-x-4">
                  <div>dl salo</div>
                </div>
                <div>music & works</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden  p-4 mb-4">
          <div className="my-8 flex-col w-full transition-all duration-500 flex">
            {links.map((link, index) => (
              <Fragment key={index}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={clsx("text-xl", {
                    "text-red-400 font-corrected": pathname === link.href,
                    "font-sans": pathname !== link.href,
                  })}
                  target={link?.tab ? `_blank` : `_self`}
                >
                  {link.name}
                </Link>
                {link.href === "/music" && (
                  <Link
                    href="/timeline"
                    onClick={() => setOpen(false)}
                    className={clsx("text-xl", {
                      "text-red-400 font-corrected": pathname === "/timeline",
                      "font-sans": pathname !== "/timeline",
                    })}
                  >
                    timeline
                  </Link>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
