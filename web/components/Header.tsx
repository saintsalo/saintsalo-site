"use client"
import Image from "next/image"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Disclosure } from "@headlessui/react"
import { HiXMark, HiOutlineBars3 } from "react-icons/hi2"

interface NavItem {
  name: string | React.ReactNode
  href: string
  tab?: boolean
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
    name: "patches",
    href: "/rnbo",
  },
  {
    name: "store",
    href: "/store",
  },
]

export const Header = () => {
  const pathname = usePathname()

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto w-full md:bg-none md:bg-off-white md:rounded p-4 md:mb-8 md:shadow-sm">
            <div className="relative flex min-h-[70px] items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                <Disclosure.Button className="items-center justify-center rounded-md p-2 border-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiXMark className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiOutlineBars3 className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
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
                            ====== {link.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <div className="mr-2 mt-8 md:mt-0 self-center">
                    <Image
                      alt="dl salo music"
                      src="/images/dl-salo-profile-image.png"
                      width="200"
                      height="200"
                      className="md:m-auto md:float-left mb-2 blur-sm hover:blur-none transition-all duration-500"
                    />
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

          <Disclosure.Panel className="md:hidden bg-off-white p-4 mb-4">
            <div className="my-8 flex-col w-full transition-all duration-500 flex">
              {links.map((link, index) => (
                <Disclosure.Button
                  key={index}
                  as="a"
                  href={link.href}
                  className={clsx("md:text-xl text-lg", {
                    "text-red-400 font-corrected": pathname === link.href,
                    "font-sans": pathname !== link.href,
                  })}
                  target={link?.tab ? `_blank` : `_self`}
                >
                  {link.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

{
  /* <div className="mb-8 flex md:flex-row flex-col w-full transition-all duration-500">
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
                ====== {link.name}
              </Link>
            </li>
          ))}
      </ul>
      <div className="mr-2 mt-8 md:mt-0 self-center">
        <Image
          alt="dl salo music"
          src="/images/dl-salo-profile-image.png"
          width="200"
          height="200"
          className="md:m-auto md:float-left mb-2 blur-sm hover:blur-none transition-all duration-500"
        />
      </div>
      <div className="flex flex-col md:mt-0 self-center">
        <div className="flex md:flex-row flex-col items-center space-x-4">
          <div>dl salo</div>
        </div>
        <div>music & works</div>
      </div>
    </div>' */
}
