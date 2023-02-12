import { getPostsData } from "@/lib/getPosts"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"
import { setImage } from "@/lib/setImage"

export default async function Collaborators() {
  const { posts } = await getPostsData("project")
  if (!posts) return null
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 items-stretch bg-[#f8f5ee] gap-4">
        {posts &&
          posts
            .sort((a, b) => {
              if (a.order === b.order) return 0
              if (a.order === null || a.order === undefined) return 1
              if (b.order === null || b.order === undefined) return -1
              return a.order < b.order ? -1 : 1
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
