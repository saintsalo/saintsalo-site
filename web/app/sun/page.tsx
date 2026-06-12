import type { Metadata } from "next"
import AsciiSun from "./AsciiSun"

export const metadata: Metadata = {
  title: "sun",
  robots: { index: false, follow: false },
}

export default function SunPage() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AsciiSun />
    </main>
  )
}
