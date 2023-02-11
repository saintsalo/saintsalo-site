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
      <div className="grid grid-cols-1 md:grid-cols-3 items-stretch bg-[#f8f5ee]">
        {posts &&
          posts
            .sort((a, b) => {
              if (a.order === b.order) return 0
              if (a.order === null || a.order === undefined) return 1
              if (b.order === null || b.order === undefined) return -1
              return a.order < b.order ? -1 : 1
            })
            .map(post => (
              <div key={post.name}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:contrast-150 transition-all shadow-sm hover:shadow-lg p-4  border-transparent rounded-md flex flex-col gap-2 relative"
                >
                  <div className="hover:font-corrected">{post.name}</div>

                  {post?.promo?.filename && (
                    <Image
                      src={setImage(post.promo.filename)}
                      alt={post.promo.altText || "dl salo"}
                      width={800}
                      height={800}
                    />
                  )}
                  <DocumentRenderer document={post.content?.document} />
                </Link>
              </div>
            ))}
      </div>
    </div>
  )
}
