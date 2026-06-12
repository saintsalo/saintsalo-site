import { DEFAULT_OG_IMAGE } from "@/lib/seo"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "White Noise",
  description: "A simple white noise generator by dl Salo.",
  alternates: { canonical: "/whitenoise" },
  openGraph: { url: "/whitenoise", title: "White Noise", images: [DEFAULT_OG_IMAGE] },
}

export default function Page() {
  return <div>White noise generator</div>
}
