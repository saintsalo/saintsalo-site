import clsx from "clsx"
import Link from "next/link"
import { BsSunset } from "react-icons/bs"

interface NavItem {
  name: string | React.ReactNode
  href: string
  tab?: boolean
}

const links: NavItem[] = [
  {
    name: "> (h)ome",
    href: "/",
  },
  {
    name: "> (m)usic",
    href: "/music",
  },
  {
    name: "> rnbo",
    href: "/rnbo",
  },
  {
    name: "> object sonore",
    href: "http://www.objectsonore.com",
    tab: true,
  },
]

export const Header = () => (
  <div className="mb-8 flex flex-row w-full">
    <div className="absolute bottom-2 right-8">
      <BsSunset />
    </div>
    <ul className="grow">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            className={clsx("hover:text-red-600 hover:font-corrected", {
              "text-red-600 font-corrected": true,
            })}
            href={link.href}
            target={link?.tab ? `_blank` : `_self`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>

    <div>dl salo: works and music</div>
  </div>
)
