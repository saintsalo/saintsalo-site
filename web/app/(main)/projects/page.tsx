import { getPostsData } from "@/lib/getPosts"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"
import { setImage } from "@/lib/setImage"
import { DEFAULT_OG_IMAGE } from "@/lib/seo"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects and Collaborators",
  description:
    "Bands, collaborations and projects featuring composer dl Salo — Holy Sun Opera House, Saint Genet, A Story of Rats, Joy Wants Eternity and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    url: "/projects",
    title: "Projects and Collaborators",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default async function Collaborators() {
  const { posts } = await getPostsData("project")
  if (!posts) return null
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 items-stretch bg-[#f8f5ee] gap-4">
        {posts &&
          posts
            .sort((a, b) => {
              const aHasOrder = a.order != null && a.order !== ""
              const bHasOrder = b.order != null && b.order !== ""
              if (aHasOrder && bHasOrder) {
                return a.order!.localeCompare(b.order!, undefined, { sensitivity: "base" })
              }
              if (aHasOrder) return -1
              if (bHasOrder) return 1
              return (a.name ?? "").localeCompare(b.name ?? "", undefined, { sensitivity: "base" })
            })
            .map(post => (
              <div key={post.name} className="flex">
                <Link
                  href={`/projects/${post.slug}`}
                  className="card p-4 flex flex-col gap-2 relative group"
                >
                  <h1 className="group-hover:font-corrected">{post.name}</h1>

                  {post?.promo?.filename && (
                    <Image
                      src={setImage(post.promo.filename)}
                      alt={post.promo.altText || "dl salo"}
                      width={800}
                      height={800}
                    />
                  )}
                  {post?.content?.document && (
                    <DocumentRenderer document={post.content?.document} />
                  )}
                </Link>
              </div>
            ))}
      </div>
    </div>
  )
}
