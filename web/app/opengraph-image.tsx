import { ImageResponse } from "next/og"

import { SITE_DESCRIPTION } from "@/lib/seo"

// Default social-share card used for any route that doesn't supply its own
// OpenGraph/Twitter image (detail pages override this with their cover art).
export const alt = "dl Salo — Los Angeles composer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div style={{ fontSize: 140, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
        dl Salo
      </div>
      <div style={{ fontSize: 40, marginTop: 32, color: "#a3a3a3", maxWidth: 900 }}>
        {SITE_DESCRIPTION}
      </div>
      <div style={{ fontSize: 30, marginTop: 48, color: "#737373", letterSpacing: "0.1em" }}>
        SAINTSALO.COM
      </div>
    </div>,
    { ...size },
  )
}
