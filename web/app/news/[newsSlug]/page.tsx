import { getPostBySlug } from "@/lib/getPosts"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Link from "next/link"
import { setImage } from "@/lib/setImage"
import Image from "next/image"

export default async function Post({ params }: { params?: any }) {
  const { post } = await getPostBySlug(params.newsSlug)
  if (!post) return <div>not here.</div>
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-4">
        <Link href={`/`} className="hover:font-corrected">{`<-- home`}</Link>
      </div>
      <h1>{post?.name}</h1>
      {post?.description?.document && <DocumentRenderer document={post?.description?.document} />}
      <div>
        {post?.embed && (
          <div
            className="embed-container"
            dangerouslySetInnerHTML={{ __html: post.embed?.toString() }}
          />
        )}
      </div>
      <div className="flex md:flex-row flex-col gap-2 mt-8">
        {post?.images &&
          post.images.map(image => (
            <div key={image.filename} className="max-w-sm">
              {image.filename && (
                <Link href={`/images/${image.filename}`} target="_blank">
                  <Image
                    src={setImage(image.filename)}
                    alt={image.altText || "dl salo"}
                    width={800}
                    height={800}
                    className="hover:contrast-150 transition-all"
                  />
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
