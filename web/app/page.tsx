import { getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const { posts } = await getPostsData("news")
  return (
    <div className="w-auto flex flex-col md:items-center">
      <div className="flex flex-col gap-8 max-w-4xl h-auto m-auto mt-0 mb-20 md:mt-20">
        <p>
          dl Salo is a modern classical and electronic composer and pianist residing in Los Angeles.
          His music interweaves classical piano, synthesizers, electronics and ambience - he is
          known for his haunting yet hopeful style of minimalism and avant garde compositions.
          Salo&apos;s music has been featured in film and t.v. and widely used in performance art,
          theater, and dance.
        </p>
        <p>
          2023:
          <br />
          <div>SEPTEMBER</div>
          <li>Extreme Evolution: Drive to Divinity (Video Game) - Original Sound Track</li>
          <div>WINTER</div>
          <li>
            New collaborators Salo &amp;{" "}
            <Link href="http://www.michaelhaertlein.com/" target="_blank">
              Haertlein
            </Link>{" "}
            releasing their first album.
          </li>
        </p>
        <p>(no upcoming performances scheduled)</p>
      </div>

      <h2 className="text-lg mb-2">News</h2>
      <div>------</div>
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
