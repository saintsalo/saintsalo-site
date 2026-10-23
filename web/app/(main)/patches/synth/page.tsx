import { pageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { SynthWithBreadcrumb } from "./synth-wrapper"

export const metadata: Metadata = pageMetadata({
  title: "Polyphonic Synthesizer",
  description:
    "A playable polyphonic synthesizer with dual oscillators, built for the browser by dl Salo.",
  path: "/patches/synth",
})

export default function Page() {
  return <SynthWithBreadcrumb />
}
