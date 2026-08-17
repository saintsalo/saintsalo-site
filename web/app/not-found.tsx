import Link from "next/link"

import { Container } from "@/components/Container"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

import type { Metadata } from "next"

// Next already emits `noindex` for the not-found boundary, so no robots override.
export const metadata: Metadata = {
  title: "Page not found",
}

// Root not-found boundary. It sits above the (main) route group, so the header
// and footer are composed here rather than inherited from (main)/layout.tsx.
// This renders for unmatched URLs and for any notFound() thrown by a page.
export default function NotFound() {
  return (
    <>
      <Container>
        <Header />
        <main>
          <div className="bg-white rounded-md w-full p-8">
            <div className="text-sm uppercase tracking-wide opacity-70">Error 404</div>
            <h1 className="text-4xl mb-4">This page doesn&apos;t exist</h1>
            <p className="mb-8">
              <span className="bio-highlight">
                The page you were looking for has moved, been renamed, or never existed at all.
              </span>
            </p>
            <div className="space-y-3 text-xl">
              <div>
                <Link href="/">&larr; back to the homepage</Link>
              </div>
              <div>
                <Link href="/music">music</Link>
              </div>
              <div>
                <Link href="/projects">projects and collaborators</Link>
              </div>
              <div>
                <Link href="/performances">performances</Link>
              </div>
              <div>
                <Link href="/contact">contact</Link>
              </div>
            </div>
          </div>
        </main>
      </Container>
      <Footer />
    </>
  )
}
