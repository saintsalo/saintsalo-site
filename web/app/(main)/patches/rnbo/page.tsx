import { pageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { RnboClient } from "./rnbo-client"

export const metadata: Metadata = pageMetadata({
  title: "RNBO Web Audio Export",
  description: "Exporting Web Audio with Max/MSP using RNBO by dl Salo.",
  path: "/patches/rnbo",
})

export default function Page() {
  return <RnboClient />
}
