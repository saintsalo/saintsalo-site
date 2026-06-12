import "./globals.css"

import type { Metadata, Viewport } from "next"

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "dl Salo",
    template: "dl Salo | %s",
  },
  keywords: ["Salo", "dl Salo", "composer", "ambient", "piano", "synth", "los angeles", "music"],
  referrer: "origin-when-cross-origin",
  authors: [
    {
      name: "dl Salo",
      url: "https://www.saintsalo.com",
    },
  ],
  creator: "dl Salo",
  description: SITE_DESCRIPTION,
  generator: "NextJs",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: {
      default: "dl Salo",
      template: "dl Salo | %s",
    },
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "dl Salo",
      template: "dl Salo | %s",
    },
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hhy8jas.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
