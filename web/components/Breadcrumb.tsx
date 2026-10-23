import Link from "next/link"

import { JsonLd } from "@/components/JsonLd"
import { breadcrumbSchema } from "@/lib/seo"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6 text-sm opacity-70">
      <JsonLd data={breadcrumbSchema(items.map(i => ({ name: i.label, path: i.href })))} />
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
