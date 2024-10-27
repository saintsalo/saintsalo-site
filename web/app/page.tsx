import { getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const { posts } = await getPostsData("news")
  const { posts: features } = await getPostsData("feature")
  return (
    <div className="w-auto flex flex-col md:items-center">
      <p className="text-2xl max-w-[500px]">
        dl Salo is a composer creating music that interweaves classical piano, synthesizers,
        electronics and ambience - he is known for his haunting yet hopeful style of musical
        compositions.
      </p>
      <div className="flex flex-col gap-8 max-w-4xl h-auto m-auto mt-0 mb-20 md:mt-20">
        {features &&
          features.map(feature => (
            <Link
              href={`/news/${feature.slug}`}
              key={feature.slug}
              className="group flex flex-col max-w-6xl gap-4 md:mx-8 p-4 card"
            >
              {feature.promo?.filename && (
                <div className="min-w-full">
                  <Image
                    alt={feature.promo?.altText || "dl salo"}
                    src={setImage(feature.promo?.filename)}
                    width="400"
                    height="400"
                    className="rounded-sm"
                  />
                </div>
              )}

              <div>
                {feature.content && <DocumentRenderer document={feature.content.document} />}
              </div>
            </Link>
          ))}
      </div>

      <div>----------------------------------------</div>
      {posts &&
        posts.map(post => (
          <Link
            href={`/news/${post.slug}`}
            key={post.slug}
            className="group flex flex-col max-w-4xl gap-4 md:mx-8 p-4 card"
          >
            <h3 className="group-hover:font-corrected">{post.name}</h3>
            <div className="flex md:flex-row flex-col gap-4">
              {post?.promo?.filename && (
                <div className="md:min-w-max min-w-full">
                  <Image
                    alt={post.promo?.altText || "dl salo"}
                    src={setImage(post.promo?.filename)}
                    width="200"
                    height="200"
                    className="rounded-sm"
                  />
                </div>
              )}
              <div>{post.content && <DocumentRenderer document={post.content.document} />}</div>
            </div>
          </Link>
        ))}
    </div>
  )
}
