import type { MetadataRoute } from "next"

import { getPostsData } from "@/lib/getPosts"
import { performances } from "@/lib/performances"
import { setImage } from "@/lib/setImage"
import { SITE_URL } from "@/lib/seo"

// Re-fetch the CMS at most hourly so newly published posts surface in the
// sitemap without a redeploy.
export const revalidate = 3600

const url = (path: string): string => `${SITE_URL}${path}`

// Image sitemap entry for a /public/images file; encodeURI keeps any spaces or
// subfolder slashes valid in the XML.
const images = (filename?: string | null): { images?: string[] } =>
  filename ? { images: [encodeURI(url(setImage(filename)))] } : {}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/music"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/performances"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/projects"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/timeline"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/store"), changeFrequency: "monthly", priority: 0.6 },
    // /scores is intentionally omitted until it has real content.
    { url: url("/patches"), changeFrequency: "monthly", priority: 0.3 },
    { url: url("/patches/rnbo"), changeFrequency: "monthly", priority: 0.2 },
    { url: url("/patches/synth"), changeFrequency: "monthly", priority: 0.2 },
    { url: url("/patches/whitenoise"), changeFrequency: "monthly", priority: 0.2 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.4 },
  ]

  // Local performance detail pages.
  const performanceEntries: MetadataRoute.Sitemap = performances.map(p => ({
    url: url(`/performances/${p.slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
    ...images(p.image),
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

    type SitemapPost = {
      slug?: string | null
      promo?: { filename?: string | null } | null
      images?: { filename?: string | null }[] | null
    }
    const fromPosts = (
      posts: SitemapPost[] | null | undefined,
      base: string,
      priority: number,
    ): MetadataRoute.Sitemap =>
      (posts ?? [])
        .filter(p => Boolean(p.slug))
        .map(p => ({
          url: url(`${base}/${p.slug}`),
          changeFrequency: "monthly",
          priority,
          ...images(p.promo?.filename || p.images?.[0]?.filename),
        }))

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
