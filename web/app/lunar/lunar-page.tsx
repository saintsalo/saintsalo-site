"use client"
import { Lunar } from "@/components/Lunar"
import { useRouter } from "next/navigation"

export default function LunarPageClient() {
  const router = useRouter()

  const goBack = () => {
    const returnTo = sessionStorage.getItem("lunarReturnTo") || "/"
    router.push(returnTo)
  }

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        onClick={goBack}
        aria-label="back"
        className="cursor-pointer border-0 bg-transparent p-0 outline-none hover:bg-transparent focus:outline-none dark:border-0 dark:bg-transparent dark:hover:bg-transparent"
      >
        <Lunar standalone />
      </button>
    </main>
  )
}
