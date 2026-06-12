import { DEFAULT_OG_IMAGE } from "@/lib/seo"
import type { Metadata } from "next"
import { RnboClient } from "./rnbo-client"

export const metadata: Metadata = {
  title: "RNBO Web Audio Export",
  description: "Exporting Web Audio with MAX/MSP using RNBO by dl Salo.",
  alternates: { canonical: "/patches/rnbo" },
  openGraph: { url: "/patches/rnbo", title: "RNBO Web Audio Export", images: [DEFAULT_OG_IMAGE] },
}

export default function Page() {
  return <RnboClient />
}
