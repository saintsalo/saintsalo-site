import { getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import { documentToText } from "@/lib/documentText"
import { releaseDates } from "@/lib/releaseDates"
import { projectRef, releaseProjects } from "@/lib/projects"
import { Timeline, type TimelineItem } from "@/components/Timeline"
import { itemListSchema, pageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/JsonLd"
import type { Metadata } from "next"

// Rebuilt at most hourly so CMS changes go live without a redeploy.
export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: "Timeline",
  description: "A chronological timeline of music releases by LA composer dl Salo",
  path: "/timeline",
})

export default async function TimelinePage() {
  const { posts } = await getPostsData("music")
  if (!posts) return null

  // Keep only releases that have a date in the local map, newest first.
  const items: TimelineItem[] = posts
    .filter(post => post.slug && releaseDates[post.slug])
    .map(post => ({ post, key: releaseDates[post.slug as string] }))
    .sort((a, b) => (a.key < b.key ? 1 : a.key > b.key ? -1 : 0))
    .map(({ post, key }) => ({
      key,
      href: `/music/${post.slug}`,
      title: post.name ?? "",
      image: post.promo?.filename ? setImage(post.promo.filename) : undefined,
      imageAlt: post.promo?.altText || post.name || "dl salo",
      summary: documentToText(post.description?.document),
      project: projectRef(releaseProjects[post.slug as string]),
    }))

  return (
    <div className="max-w-3xl w-full">
      <JsonLd data={itemListSchema(items.map(item => item.href))} />
      <h1 className="mb-8">Timeline</h1>
      <Timeline items={items} />
    </div>
  )
}
