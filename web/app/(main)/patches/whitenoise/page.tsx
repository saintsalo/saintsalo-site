import { pageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { WhiteNoiseWithBreadcrumb } from "./white-noise-wrapper"

export const metadata: Metadata = pageMetadata({
  title: "White Noise Generator",
  description: "A simple browser-based white noise generator by dl Salo.",
  path: "/patches/whitenoise",
})

export default function Page() {
  return <WhiteNoiseWithBreadcrumb />
}
