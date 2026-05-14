import { getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Music and Works",
  description: "Collection of works and music by LA composer dl Salo",
}

export default async function Music() {
  const { posts } = await getPostsData("music")
  if (!posts) return null

  const sorted = [...posts].sort((a, b) => {
    if (a.order === b.order) return 0
    if (a.order === null || a.order === undefined) return 1
    if (b.order === null || b.order === undefined) return -1
    return a.order < b.order ? 1 : -1
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sorted.map(post => (
        <Link
          key={post.slug}
          href={`/music/${post.slug}`}
          className="card p-3 flex flex-col gap-2 group"
        >
          {post?.promo?.filename ? (
            <Image
              src={setImage(post.promo.filename)}
              alt={post.promo.altText || post.name || "dl salo"}
              width={600}
              height={600}
              className="w-full aspect-square object-cover rounded-xs"
            />
          ) : (
            <div className="w-full aspect-square rounded-xs bg-black/5 flex items-center justify-center text-xs text-black/40">
              no artwork
            </div>
          )}
          <div className="md:text-lg text-md group-hover:font-corrected">{post.name}</div>
        </Link>
      ))}
    </div>
  )
}
