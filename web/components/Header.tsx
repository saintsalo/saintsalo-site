"use client"

import clsx from "clsx"
import Link from "next/link"
import { BsSunset } from "react-icons/bs"
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
    name: "rnbo",
    href: "/rnbo",
  },
  {
    name: "col",
    href: "/collaborators",
  },
  // {
  //   name: "object sonore >",
  //   href: "http://www.objectsonore.com",
  //   tab: true,
  // },
]

export const Header = () => {
  const pathname = usePathname()

  return (
    <div className="mb-8 flex flex-row w-full">
      <div className="absolute bottom-2 right-8">
        <BsSunset />
      </div>
      <ul className="grow">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              className={clsx({
                "text-red-400 font-corrected": pathname === link.href,
              })}
              href={link.href}
              target={link?.tab ? `_blank` : `_self`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col">
        <div className="flex flex-row items-center space-x-4">
          <div>dl salo</div>
        </div>
        <div className="font-underlined">music & works</div>
      </div>
    </div>
  )
}
