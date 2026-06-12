import { DEFAULT_OG_IMAGE } from "@/lib/seo"

import type { Metadata } from "next"

// The rnbo page itself is a client component (Web Audio), so its metadata lives
// here in a colocated layout.
export const metadata: Metadata = {
  title: "Web Audio Export (RNBO)",
  description: "A Max/MSP RNBO patch exported to the browser via Web Audio, by dl Salo.",
  alternates: { canonical: "/rnbo" },
  openGraph: { url: "/rnbo", title: "Web Audio Export (RNBO)", images: [DEFAULT_OG_IMAGE] },
}

export default function RnboLayout({ children }: { children: React.ReactNode }) {
  return children
}
