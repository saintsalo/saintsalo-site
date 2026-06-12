import { getPerformanceBySlug, performances } from "@/lib/performances"
import { setImage } from "@/lib/setImage"
import { projectRef } from "@/lib/projects"
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo"
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
  const canonical = `/performances/${performanceSlug}`
  return {
    title: show?.title || "Performance",
    description: show?.summary || "Live performance by composer dl Salo",
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: show?.title || "Performance",
      description: show?.summary || "Live performance by composer dl Salo",
      url: canonical,
      images: [show?.image ? setImage(show.image) : DEFAULT_OG_IMAGE],
    },
  }
}

export default async function PerformanceDetail({
  params,
}: {
  params: Promise<{ performanceSlug: string }>
}) {
  const { performanceSlug } = await params
  const show = getPerformanceBySlug(performanceSlug)
  if (!show) notFound()

  const performer = projectRef(show.project)
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: show.title,
    url: `${SITE_URL}/performances/${performanceSlug}`,
    startDate: show.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(show.summary ? { description: show.summary } : {}),
    ...(show.image ? { image: absoluteUrl(setImage(show.image)) } : {}),
    ...(show.venue || show.location
      ? {
          location: {
            "@type": "Place",
            name: show.venue || show.location,
            ...(show.location
              ? { address: { "@type": "PostalAddress", streetAddress: show.location } }
              : {}),
          },
        }
      : {}),
    performer: {
      "@type": performer.href ? "MusicGroup" : "Person",
      name: performer.name,
      url: performer.href ? `${SITE_URL}${performer.href}` : SITE_URL,
    },
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <JsonLd data={eventSchema} />
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
