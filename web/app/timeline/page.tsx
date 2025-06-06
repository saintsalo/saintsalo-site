import { getPostsData } from "@/lib/getPosts"
import { MusicNav } from "@/components/MusicNav"
import type { Metadata } from "next"
import ExpandContent from "@/components/ExpandContent"

export const metadata: Metadata = {
  title: "Music and Works",
  description: "Collection of works and music by LA composer dl Salo",
}

export default async function Music() {
  const { posts } = await getPostsData("music")
  if (!posts) return null
  return (
    <div>
      <div className="">
        {posts.map(post => (
          <div key={post.name}>
            <ExpandContent post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}
