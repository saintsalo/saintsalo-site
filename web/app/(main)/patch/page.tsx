import Link from "next/link"

import { DEFAULT_OG_IMAGE } from "@/lib/seo"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Patch",
  description: "Experiments with Max/MSP and RNBO by dl Salo.",
  alternates: { canonical: "/patch" },
  openGraph: { url: "/patch", title: "Patch", images: [DEFAULT_OG_IMAGE] },
}

function Page() {
  return (
    <div>
      Experiments with Max/MSP and RNBO... <div className="">(this page always changes)</div>
      <div className="my-8">
        <Link href="/rnbo">Web Audio Export</Link>
      </div>
    </div>
  )
}

export default Page
