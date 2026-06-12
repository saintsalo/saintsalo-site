import { DEFAULT_OG_IMAGE } from "@/lib/seo"
import type { Metadata } from "next"
import { SynthComponent } from "./synth"

export const metadata: Metadata = {
  title: "Synth",
  description: "A fully functional polyphonic synthesizer with dual oscillators by dl Salo.",
  alternates: { canonical: "/synth" },
  openGraph: { url: "/synth", title: "Synth", images: [DEFAULT_OG_IMAGE] },
}

export default function Page() {
  return <SynthComponent />
}
