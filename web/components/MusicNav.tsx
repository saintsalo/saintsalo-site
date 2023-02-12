import { AllPostsQuery } from "@/graphql/generated/graphql"
import Link from "next/link"

export const MusicNav = (data: AllPostsQuery) => {
  if (!data.posts) return null
  const { posts } = data
  return (
    <div>
      <ul className="max-w-xs mr-4 truncate ...">
        {posts.map(post => (
          <li key={post.name}>
            <Link href={`/music/${post.slug}`}>{post.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
