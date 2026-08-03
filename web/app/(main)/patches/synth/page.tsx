import { DEFAULT_OG_IMAGE } from "@/lib/seo"
import type { Metadata } from "next"
import { SynthWithBreadcrumb } from "./synth-wrapper"

export const metadata: Metadata = {
  title: "Polyphonic Synthesizer",
  description:
    "A playable polyphonic synthesizer with dual oscillators, built for the browser by dl Salo.",
  alternates: { canonical: "/patches/synth" },
  openGraph: {
    url: "/patches/synth",
    title: "Polyphonic Synthesizer",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function Page() {
  return <SynthWithBreadcrumb />
}
