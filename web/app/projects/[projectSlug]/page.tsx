import { getPostBySlug } from "@/lib/getPosts"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Link from "next/link"

export default async function Post({ params }: { params?: any }) {
  const { post } = await getPostBySlug(params.projectSlug)

  return (
    <div>
      <div className="mb-4">
        <Link href={`/projects`} className="hover:font-corrected">{`<-- projects`}</Link>
      </div>
      <h1>{post?.name}</h1>
      {post?.description?.document && <DocumentRenderer document={post?.description?.document} />}
    </div>
  )
}
