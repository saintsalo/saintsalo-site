import Image from "next/image"
import Link from "next/link"

export interface TimelineItem {
  /** "YYYY-MM" — used to group entries under a sticky MONTH YEAR label */
  key: string
  href: string
  title: string
  /** already-resolved <Image> src (e.g. via setImage); omit for a placeholder */
  image?: string
  imageAlt?: string
  summary?: string
  /** project/collaborator header shown above the entry; href links to the project */
  project?: { name: string; href?: string }
}

const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
]

// "2026-05" -> "MAY 2026"
export const formatMonthYear = (key: string): string => {
  const [year, month] = key.split("-")
  const idx = Number(month) - 1
  const label = MONTHS[idx]
  return label ? `${label} ${year}` : year
}

/**
 * Vertical timeline: a sticky MONTH YEAR label on the left, a dot/line rail, and
 * a clickable entry (small artwork + title + truncated summary) on the right.
 * Items must be pre-sorted in the order you want them displayed; consecutive
 * items sharing a `key` are grouped under one label.
 */
export const Timeline = ({ items }: { items: TimelineItem[] }) => {
  const groups: { key: string; items: TimelineItem[] }[] = []
  for (const item of items) {
    const last = groups[groups.length - 1]
    if (last && last.key === item.key) last.items.push(item)
    else groups.push({ key: item.key, items: [item] })
  }

  return (
    <div className="flex flex-col gap-10">
      {groups.map(group => (
        <section key={group.key} className="flex items-start gap-4 md:gap-8">
          <div className="sticky top-4 shrink-0 w-20 md:w-28 text-sm md:text-base leading-tight">
            {formatMonthYear(group.key)}
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            {group.items.map(item => (
              <article key={item.href} className="flex gap-4">
                <aside className="flex flex-col items-center self-stretch shrink-0">
                  <span className="mt-1.5 size-2 rounded-full bg-current" />
                  <span className="w-px flex-1 my-2 bg-current/25" />
                </aside>

                <div className="flex flex-col flex-1 min-w-0 pb-8">
                  {item.project &&
                    (item.project.href ? (
                      <Link
                        href={item.project.href}
                        className="w-fit text-xs uppercase tracking-wide opacity-60 hover:text-red-400 hover:opacity-100"
                      >
                        {item.project.name}
                      </Link>
                    ) : (
                      <span className="text-xs uppercase tracking-wide opacity-60">
                        {item.project.name}
                      </span>
                    ))}

                  <Link href={item.href} className="group flex gap-4 mt-1 min-w-0 hover:text-red-400">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        width={160}
                        height={160}
                        className="size-16 md:size-20 object-cover rounded-xs shrink-0"
                      />
                    ) : (
                      <div className="size-16 md:size-20 rounded-xs bg-black/5 dark:bg-white/10 shrink-0" />
                    )}

                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="text-sm md:text-base leading-snug">{item.title}</h3>
                      {item.summary && (
                        <p className="text-sm opacity-60 line-clamp-2 leading-snug">{item.summary}</p>
                      )}
                    </div>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
