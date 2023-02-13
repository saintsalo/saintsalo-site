import { Container } from "@/components/Container"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import "./globals.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "dl Salo",
    template: "dl Salo | %s",
  },
  keywords: ["Salo", "dl Salo", "composer", "ambient", "piano", "synth", "los angeles", "music"],
  referrer: "origin-when-cross-origin",
  authors: [
    {
      name: "dl Salo",
      url: "http://www.saintsalo.com",
    },
  ],
  creator: "dl Salo",
  description: "Collection of works and music by LA composer dl Salo",
  themeColor: "#F9F5EC",
  generator: "NextJs",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hhy8jas.css" />
      </head>
      <body>
        <Container>
          <Header />
          <div>{children}</div>
        </Container>
        <Footer />
      </body>
    </html>
  )
}
