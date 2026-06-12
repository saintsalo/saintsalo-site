import type { Metadata } from "next"
import LunarPageClient from "./lunar-page"

export const metadata: Metadata = {
  title: "lunar",
  robots: { index: false, follow: false },
}

export default function LunarPage() {
  return <LunarPageClient />
}
