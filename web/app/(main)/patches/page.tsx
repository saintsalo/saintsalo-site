import Link from "next/link"
import { DEFAULT_OG_IMAGE } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Patches",
  description: "Experiments with Max/MSP and RNBO by dl Salo.",
  alternates: { canonical: "/patches" },
  openGraph: { url: "/patches", title: "Patches", images: [DEFAULT_OG_IMAGE] },
}

function Page() {
  return (
    <div className="bg-white rounded-md w-full p-8">
      <h1>Patches</h1>
      <p className="mb-8">
        <span className="bio-highlight">
          Experiments with Max/MSP and RNBO... (this page always changes)
        </span>
      </p>
      <div className="space-y-3">
        <div>
          <Link href="/patches/rnbo" className="hover:underline">
            Web Audio Export
          </Link>
        </div>
        <div>
          <Link href="/patches/whitenoise" className="hover:underline">
            White Noise Generator
          </Link>
        </div>
        <div>
          <Link href="/patches/synth" className="hover:underline">
            Polyphonic Synthesizer
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
