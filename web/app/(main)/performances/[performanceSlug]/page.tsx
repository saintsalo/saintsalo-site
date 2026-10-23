import {
  getPerformanceBySlug,
  performances,
  postalAddress,
  startDateTime,
} from "@/lib/performances"
import { setImage } from "@/lib/setImage"
import { projectRef } from "@/lib/projects"
import {
  absoluteUrl,
  breadcrumbSchema,
  ogImage,
  pageMetadata,
  personRef,
  SITE_URL,
} from "@/lib/seo"
import { JsonLd } from "@/components/JsonLd"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export function generateStaticParams() {
  return performances.map(p => ({ performanceSlug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ performanceSlug: string }>
}): Promise<Metadata> {
  const { performanceSlug } = await params
  const show = getPerformanceBySlug(performanceSlug)
  return pageMetadata({
    title: show?.title || "Performance",
    description: show?.summary || "Live performance by composer dl Salo",
    path: `/performances/${performanceSlug}`,
    image: ogImage(show?.image),
    type: "article",
  })
}

export default async function PerformanceDetail({
  params,
}: {
  params: Promise<{ performanceSlug: string }>
}) {
  const { performanceSlug } = await params
  const show = getPerformanceBySlug(performanceSlug)
  if (!show) notFound()

  const performers = [show.project, ...(show.alsoProjects ?? [])].map(slug =>
    slug
      ? {
          "@type": "MusicGroup",
          name: projectRef(slug).name,
          url: absoluteUrl(`/projects/${slug}`),
          member: personRef,
        }
      : personRef,
  )
  const tickets = show.links?.find(l => l.label.toLowerCase().startsWith("tickets"))
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: show.title,
    url: `${SITE_URL}/performances/${performanceSlug}`,
    startDate: startDateTime(show),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(show.summary ? { description: show.summary } : {}),
    ...(show.image ? { image: absoluteUrl(setImage(show.image)) } : {}),
    ...(show.venue || show.location
      ? {
          location: {
            "@type": "Place",
            name: show.venue || show.location,
            ...(show.location ? { address: postalAddress(show.location) } : {}),
          },
        }
      : {}),
    performer: performers.length === 1 ? performers[0] : performers,
    ...(tickets ? { offers: { "@type": "Offer", url: tickets.href } } : {}),
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <JsonLd data={eventSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Performances", path: "/performances" },
          { name: show.title, path: `/performances/${performanceSlug}` },
        ])}
      />
      <div>
        <Link href="/performances" className="text-sm">
          {`<= all performances`}
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:p-8 p-4 rounded-sm bg-off-white shadow-lg">
        <h1 className="text-3xl dark:text-black">{show.title}</h1>

        <div className="font-correct">
          <div className="text-xl">{show.dateLabel}</div>
          {show.venue && <div>{show.venue}</div>}
          {show.location && <div className="opacity-70">{show.location}</div>}
        </div>

        {show.image && (
          <Image
            src={setImage(show.image)}
            alt={show.title}
            width={800}
            height={800}
            className="w-full max-w-xl rounded-xs"
          />
        )}

        {show.details && (
          <div
            className="flex flex-col gap-4 max-w-prose"
            dangerouslySetInnerHTML={{ __html: show.details }}
          />
        )}

        {show.links && show.links.length > 0 && (
          <div className="flex flex-col gap-1 pt-2">
            {show.links.map(link => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
