import Link from "next/link"

import { absoluteUrl, pageMetadata, personRef } from "@/lib/seo"
import { JsonLd } from "@/components/JsonLd"

import type { Metadata } from "next"

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with composer dl Salo — booking, press, and label enquiries.",
  path: "/contact",
})

export default function Page() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/contact"),
          about: personRef,
        }}
      />
      <h1>Contact</h1>
      <div>
        email: <Link href="mailto:saintsalo@gmail.com">saintsalo@gmail.com</Link>
      </div>
      <div>
        <Link href="https://www.hologramopera.com" target="_blank">
          Hologram Opera
        </Link>{" "}
        (Label) email: <Link href="mailto:salo@hologramopera.com">salo@hologramopera.com</Link>
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
