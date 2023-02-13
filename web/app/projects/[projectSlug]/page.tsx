import { getPostBySlug } from "@/lib/getPosts"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Link from "next/link"
import { setImage } from "@/lib/setImage"
import Image from "next/image"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params?: any }): Promise<Metadata> {
  const { post } = await getPostBySlug(params.projectSlug)
  return {
    title: post?.name,
    description: post?.seo || "",
  }
}

export default async function Post({ params }: { params?: any }) {
  const { post } = await getPostBySlug(params.projectSlug)

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-4">
        <Link href={`/projects`} className="hover:font-corrected">{`<-- projects`}</Link>
      </div>
      <h1>{post?.name}</h1>
      {post?.description?.document && <DocumentRenderer document={post?.description?.document} />}
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
