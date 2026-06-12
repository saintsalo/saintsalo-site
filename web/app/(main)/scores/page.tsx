import Link from "next/link"

import { DEFAULT_OG_IMAGE } from "@/lib/seo"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Music Score Clips",
  description: "Clips from music scores by composer dl Salo.",
  alternates: { canonical: "/scores" },
  openGraph: { url: "/scores", title: "Music Score Clips", images: [DEFAULT_OG_IMAGE] },
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
