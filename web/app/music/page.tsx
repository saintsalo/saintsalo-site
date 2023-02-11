import { getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import Image from "next/image"
import { DocumentRenderer } from "@keystone-6/document-renderer"

export default async function Music() {
  const { posts } = await getPostsData("music")
  if (!posts) return null
  return (
    <div>
      <div className="flex flex-col place-content-center items-center justify-center text-center w-full gap-20">
        {posts
          .sort((a, b) => {
            if (a.order === b.order) return 0
            if (a.order === null || a.order === undefined) return 1
            if (b.order === null || b.order === undefined) return -1
            return a.order < b.order ? -1 : 1
          })
          .map(post => (
            <div key={post.name} className="flex flex-col gap-4 max-w-4xl">
              <div>{post.name}</div>
              {post?.promo?.filename && (
                <Image
                  src={setImage(post.promo.filename)}
                  alt={post.promo.altText || "dl salo"}
                  width={800}
                  height={800}
                />
              )}
              <div>
                {post.embed && (
                  <div
                    className="Container"
                    dangerouslySetInnerHTML={{ __html: post.embed?.toString() }}
                  />
                )}
              </div>
              {post?.content?.document && <DocumentRenderer document={post.content?.document} />}
              <div className="text-center">-------</div>
            </div>
          ))}
      </div>
    </div>
  )
}
