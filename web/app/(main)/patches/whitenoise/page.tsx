import { DEFAULT_OG_IMAGE } from "@/lib/seo"
import type { Metadata } from "next"
import { WhiteNoiseWithBreadcrumb } from "./white-noise-wrapper"

export const metadata: Metadata = {
  title: "White Noise",
  description: "A simple white noise generator by dl Salo.",
  alternates: { canonical: "/patches/whitenoise" },
  openGraph: { url: "/patches/whitenoise", title: "White Noise", images: [DEFAULT_OG_IMAGE] },
}

export default function Page() {
  return <WhiteNoiseWithBreadcrumb />
}
