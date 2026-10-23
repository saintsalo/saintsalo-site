import { getPostBySlug } from "@/lib/getPosts"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Link from "next/link"
import { notFound } from "next/navigation"
import { setImage } from "@/lib/setImage"
import {
  absoluteUrl,
  breadcrumbSchema,
  describe,
  ogImage,
  pageMetadata,
  personRef,
} from "@/lib/seo"
import { JsonLd } from "@/components/JsonLd"
import Image from "next/image"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ newsSlug: string }>
}): Promise<Metadata> {
  const { newsSlug } = await params
  const { post } = await getPostBySlug(newsSlug)
  const cover = post?.promo?.filename || post?.images?.[0]?.filename
  return pageMetadata({
    title: post?.name,
    description: describe(
      post,
      post?.name ? `${post.name}: news from composer dl Salo.` : "News from composer dl Salo.",
    ),
    path: `/news/${newsSlug}`,
    image: ogImage(cover),
    type: "article",
  })
}

export default async function Post({ params }: { params: Promise<{ newsSlug: string }> }) {
  const { newsSlug } = await params
  const { post } = await getPostBySlug(newsSlug)
  if (!post) notFound()

  const cover = post.promo?.filename || post.images?.[0]?.filename
  const description = describe(post, "")
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.name,
    url: absoluteUrl(`/news/${newsSlug}`),
    mainEntityOfPage: absoluteUrl(`/news/${newsSlug}`),
    author: personRef,
    publisher: personRef,
    ...(post.createdAt ? { datePublished: post.createdAt } : {}),
    ...(description ? { description } : {}),
    ...(cover ? { image: absoluteUrl(setImage(cover)) } : {}),
  }

  return (
    <div className="flex flex-col gap-2">
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([{ name: post.name ?? newsSlug, path: `/news/${newsSlug}` }])}
      />
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
                    alt={image.altText || post.name || "dl Salo news"}
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
