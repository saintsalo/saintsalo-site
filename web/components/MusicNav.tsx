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
        {posts
          .sort((a, b) => {
            if (a.order === b.order) return 0
            if (a.order === null || a.order === undefined) return -1
            if (b.order === null || b.order === undefined) return 1
            return a.order < b.order ? 1 : -1
          })
          .map(post => (
            <li key={post.name} className="mb-2">
              {`=>`}{" "}
              <Link
                href={`/music/${post.slug}`}
                className={clsx("md:text-lg text-md", {
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
