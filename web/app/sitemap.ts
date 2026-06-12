import type { MetadataRoute } from "next"

import { getPostsData } from "@/lib/getPosts"
import { performances } from "@/lib/performances"
import { SITE_URL } from "@/lib/seo"

// Re-fetch the CMS at most hourly so newly published posts surface in the
// sitemap without a redeploy.
export const revalidate = 3600

const url = (path: string): string => `${SITE_URL}${path}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/music"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/performances"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/projects"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/timeline"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/store"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/scores"), changeFrequency: "monthly", priority: 0.4 },
    { url: url("/patch"), changeFrequency: "monthly", priority: 0.3 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.4 },
  ]

  // Local performance detail pages.
  const performanceEntries: MetadataRoute.Sitemap = performances.map(p => ({
    url: url(`/performances/${p.slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  // CMS-driven detail pages. The GraphQL endpoint can be unavailable at build
  // time; if so we still emit a valid sitemap from the known static routes.
  let cmsEntries: MetadataRoute.Sitemap = []
  try {
    const [music, news, projects] = await Promise.all([
      getPostsData("music"),
      getPostsData("news"),
      getPostsData("project"),
    ])

    const fromPosts = (
      posts: { slug?: string | null }[] | null | undefined,
      base: string,
      priority: number,
    ): MetadataRoute.Sitemap =>
      (posts ?? [])
        .filter((p): p is { slug: string } => Boolean(p.slug))
        .map(p => ({ url: url(`${base}/${p.slug}`), changeFrequency: "monthly", priority }))

    cmsEntries = [
      ...fromPosts(music.posts, "/music", 0.8),
      ...fromPosts(news.posts, "/news", 0.7),
      ...fromPosts(projects.posts, "/projects", 0.7),
    ]
  } catch {
    // Endpoint unreachable — fall back to static + performance routes only.
  }

  return [...staticEntries, ...performanceEntries, ...cmsEntries]
}
