import Image from "next/image"
import Link from "next/link"
import type { Performance } from "@/lib/performances"
import { setImage } from "@/lib/setImage"

// Compact list of upcoming shows: poster (links to the show page), date/venue, tickets.
export const UpcomingShows = ({
  shows,
  className,
}: {
  shows: Performance[]
  className?: string
}) => {
  if (shows.length === 0) return null
  return (
    <div className={className}>
      <div className="text-sm uppercase tracking-wide opacity-70 mb-4">
        {shows.length > 1 ? "Upcoming shows" : "Upcoming show"}
      </div>
      <div className="flex flex-wrap gap-8">
        {shows.map(show => {
          const tickets = show.links?.find(l => l.label.toLowerCase().startsWith("tickets"))
          return (
            <div key={show.slug} className="flex flex-col gap-2 max-w-60">
              <Link href={`/performances/${show.slug}`}>
                {show.image ? (
                  <Image
                    src={setImage(show.image)}
                    alt={show.title}
                    width={240}
                    height={240}
                    className="hover:contrast-150 transition-all rounded-xs"
                  />
                ) : (
                  <span className="hover:font-corrected">{show.title}</span>
                )}
              </Link>
              <div>
                {show.dateLabel}
                {show.venue && ` · ${show.venue}`}
              </div>
              {tickets && (
                <a href={tickets.href} target="_blank" rel="noopener">
                  Tickets
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
