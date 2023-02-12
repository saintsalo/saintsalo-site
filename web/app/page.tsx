import { getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const { posts } = await getPostsData("news")
  return (
    <div className="w-auto flex flex-col items-center">
      <p className="flex items-center max-w-4xl h-auto m-auto mt-0 mb-20 md:mt-20">
        dl Salo is a modern classical composer residing in Los Angeles. His music interweaves
        classical piano, synthesizers, electronics and ambience - he is known for his haunting yet
        hopeful style of minimalism and avant garde compositions. Salo&apos;s music has been
        featured in film and t.v. and widely used in performance art, theater, and dance.
      </p>
      <h1>News</h1>
      {posts &&
        posts.map(post => (
          <Link
            href={`/news/${post.slug}`}
            key={post.slug}
            className="group flex flex-col max-w-4xl gap-4 mx-8 p-4 card"
          >
            <h1 className="group-hover:font-corrected">{post.name}</h1>
            <div className="flex flex-row gap-4">
              {post?.promo?.filename && (
                <div className="min-w-max">
                  <Image
                    alt={post.promo?.altText || "dl salo"}
                    src={setImage(post.promo?.filename)}
                    width="200"
                    height="200"
                    className="rounded-sm"
                  />
                </div>
              )}
              {post.content && <DocumentRenderer document={post.content.document} />}
            </div>
          </Link>
        ))}
    </div>
  )
}
