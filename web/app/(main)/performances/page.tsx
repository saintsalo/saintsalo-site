import { performances } from "@/lib/performances"
import { setImage } from "@/lib/setImage"
import { projectRef } from "@/lib/projects"
import { Timeline, type TimelineItem } from "@/components/Timeline"
import { itemListSchema, pageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/JsonLd"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

// Rebuilt at most hourly so shows move from upcoming to past without a redeploy.
export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: "Performances",
  description: "Upcoming and past live performances by composer dl Salo.",
  path: "/performances",
})

export default function Page() {
  // Compare on date only so a show happening "today" still counts as upcoming.
  const today = new Date().toISOString().slice(0, 10)

  const sorted = [...performances].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  // Featured shows stay pinned to the top regardless of date.
  const upcoming = sorted.filter(p => p.featured || p.date >= today)
  const past = sorted.filter(p => !p.featured && p.date < today)

  const pastItems: TimelineItem[] = past.map(p => ({
    key: p.date.slice(0, 7),
    href: `/performances/${p.slug}`,
    title: p.title,
    image: p.image ? setImage(p.image) : undefined,
    imageAlt: p.title,
    summary: [p.venue, p.location].filter(Boolean).join(" · ") || p.summary,
    project: projectRef(p.project),
  }))

  return (
    <div className="flex flex-col gap-12">
      <JsonLd data={itemListSchema(sorted.map(p => `/performances/${p.slug}`))} />
      <h1 className="sr-only">Performances</h1>
      {upcoming.length > 0 && (
        <div className="flex flex-col gap-8">
          {[...upcoming].reverse().map(p => (
            <Link
              key={p.slug}
              href={`/performances/${p.slug}`}
              className="bg-white rounded-md w-full p-8 block hover:contrast-125 transition-all"
            >
              <h2 className="text-4xl">{p.title}</h2>
              <div className="font-correct mt-2">
                <div className="text-3xl">
                  {p.dateLabel}
                  {p.venue ? `, ${p.venue}` : ""}
                  {p.location ? ` — ${p.location}` : ""}
                </div>
                {p.summary && <div className="text-2xl mt-2">{p.summary}</div>}
              </div>
              {p.image && (
                <div className="pt-4">
                  <Image
                    src={setImage(p.image)}
                    alt={p.title}
                    width={500}
                    height={500}
                    className="hover:contrast-150 transition-all"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {past.length > 0 && (
        <div className="max-w-3xl w-full">
          <h2 className="mb-8">Past shows</h2>
          <Timeline items={pastItems} />
        </div>
      )}
    </div>
  )
}
