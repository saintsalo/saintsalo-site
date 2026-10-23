import Link from "next/link"

import { pageMetadata } from "@/lib/seo"

import type { Metadata } from "next"

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Music Score Clips",
    description: "Clips from music scores by composer dl Salo.",
    path: "/scores",
  }),
  // Placeholder page — keep it out of the index (and the sitemap) until it has
  // real content, then remove this override.
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <div>
      <h1>Music Score Clips</h1>
      <div className="flex flex-col">
        <div className="flex md:flex-row flex-col gap-4">
          <div>title</div>
          <div>video</div>
        </div>
      </div>
    </div>
  )
}
