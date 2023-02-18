"use client"
import { AllPostsQuery } from "@/graphql/generated/graphql"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const MusicNav = (data: AllPostsQuery) => {
  const pathname = usePathname()
  if (!data.posts) return null
  const { posts } = data
  return (
    <div className="p-4">
      <ul className="max-w-sm mr-4">
        {posts.map(post => (
          <li key={post.name} className="mb-2">
            {`=>`}{" "}
            <Link
              href={`/music/${post.slug}`}
              className={clsx("md:text-md", {
                "text-red-400 font-corrected": pathname === `/music/${post.slug}`,
                "font-sans": pathname !== `/music/${post.slug}`,
              })}
            >
              {post.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
