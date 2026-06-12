import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 mb-6 text-sm opacity-70">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <Link href={item.href} className="hover:opacity-100 transition-opacity">
            {item.label}
          </Link>
          {index < items.length - 1 && <span>/</span>}
        </div>
      ))}
    </nav>
  )
}
