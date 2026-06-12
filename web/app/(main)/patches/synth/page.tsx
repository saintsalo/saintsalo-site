import { DEFAULT_OG_IMAGE } from "@/lib/seo"
import type { Metadata } from "next"
import { SynthWithBreadcrumb } from "./synth-wrapper"

export const metadata: Metadata = {
  title: "Synth",
  description: "A fully functional polyphonic synthesizer with dual oscillators by dl Salo.",
  alternates: { canonical: "/patches/synth" },
  openGraph: { url: "/patches/synth", title: "Synth", images: [DEFAULT_OG_IMAGE] },
}

export default function Page() {
  return <SynthWithBreadcrumb />
}
