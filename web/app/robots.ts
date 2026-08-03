import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    // /sun and /lunar are kept out of search via `robots: noindex` in their page
    // metadata rather than a crawl disallow — blocking the crawl would stop
    // engines from ever seeing the noindex directive.
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
