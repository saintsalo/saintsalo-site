"use client"
import Image from "next/image"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
    name: "projects",
    href: "/projects",
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
    <div className="mb-8 flex md:flex-row flex-col w-full transition-all duration-500">
      <ul className="grow">
        {links &&
          links.map((link, index) => (
            <li key={index}>
              <Link
                className={clsx({
                  "text-red-400 font-corrected": pathname === link.href,
                })}
                href={link.href}
                target={link?.tab ? `_blank` : `_self`}
              >
                ======{link.name}
              </Link>
            </li>
          ))}
      </ul>
      <div className="mr-2">
        <Image
          alt="dl salo music"
          src="/images/dl-salo-profile-image.png"
          width="200"
          height="200"
          className="md:m-auto md:float-left mb-2 blur-sm hover:blur-none transition-all duration-500"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center space-x-4">
          <div>dl salo</div>
        </div>
        <div className="font-underlined">music & works</div>
      </div>
    </div>
  )
}
