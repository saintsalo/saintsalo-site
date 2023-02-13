import { MusicNav } from "@/components/MusicNav"
import { getPostBySlug, getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"

import type { Metadata } from "next"

export async function generateMetadata({ params }: { params?: any }): Promise<Metadata> {
  const { post } = await getPostBySlug(params.musicSlug)
  return {
    title: post?.name,
    description: post?.seo || "",
  }
}

export default async function Music({ params }: { params?: any }) {
  const { post } = await getPostBySlug(params.musicSlug)
  const { posts } = await getPostsData("music")
  if (!post) return <div>not here.</div>

  return (
    <div className="flex md:flex-row flex-col w-full gap-8">
      <div>
        <MusicNav posts={posts} />
      </div>
      <div className="flex flex-col gap-4 max-w-4xl items-center md:p-8 p-2 rounded bg-off-white shadow-lg">
        <h1>{post.name}</h1>
        {post?.content?.document && <DocumentRenderer document={post.content?.document} />}
        <div className="w-full flex flex-col items-center md:bg-black rounded-md md:p-8">
          {post.embed && (
            <div
              className="rounded-sm p-2 flex flex-col items-center w-full"
              dangerouslySetInnerHTML={{ __html: post.embed?.toString() }}
            />
          )}
        </div>
        {post?.promo?.filename && (
          <Image
            src={setImage(post.promo.filename)}
            alt={post.promo.altText || "dl salo"}
            width={800}
            height={800}
            className="w-full"
          />
        )}

        <div className="text-center">-------</div>
      </div>
      {/* <div className="max-w-2xl w-full">
        <h1>{post?.name}</h1>
        {post?.embed && (
          <div className="Container" dangerouslySetInnerHTML={{ __html: post.embed?.toString() }} />
        )}
        {post?.description?.document && <DocumentRenderer document={post?.description?.document} />}
      </div> */}
    </div>
  )
}
