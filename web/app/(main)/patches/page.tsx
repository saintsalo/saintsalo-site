import Link from "next/link"
import { pageMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = pageMetadata({
  title: "Max/MSP Patches",
  description:
    "Interactive Max/MSP and RNBO audio experiments by dl Salo — a polyphonic synthesizer, a white noise generator, and Web Audio exports that run in the browser.",
  path: "/patches",
})

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
