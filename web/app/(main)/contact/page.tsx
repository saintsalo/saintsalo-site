import Link from "next/link"

import { DEFAULT_OG_IMAGE } from "@/lib/seo"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with composer dl Salo — booking, press, and label enquiries.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact", images: [DEFAULT_OG_IMAGE] },
}

export default function Page() {
  return (
    <div>
      <h1>Contact</h1>
      <div>
        email: <Link href="mailto:saintsalo@gmail.com">saintsalo@gmail.com</Link>
      </div>
      <div>
        Object Sonore (Label) email:{" "}
        <Link href="mailto:salo@objectsonore.com">salo@objectsonore.com</Link>
      </div>
      <div>
        dm/instagram:{" "}
        <Link href="https://www.instagram.com/saintsalo/" target="_blank">
          @saintsalo
        </Link>
      </div>
    </div>
  )
}
