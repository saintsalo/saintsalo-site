import { getPostBySlug, getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo"
import { JsonLd } from "@/components/JsonLd"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"

import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ musicSlug: string }>
}): Promise<Metadata> {
  const { musicSlug } = await params
  const { post } = await getPostBySlug(musicSlug)
  const cover = post?.promo?.filename || post?.images?.[0]?.filename
  const canonical = `/music/${musicSlug}`
  return {
    title: post?.name,
    description: post?.seo || "",
    alternates: { canonical },
    openGraph: {
      type: "music.album",
      title: post?.name ?? undefined,
      description: post?.seo || "",
      url: canonical,
      images: [cover ? setImage(cover) : DEFAULT_OG_IMAGE],
    },
  }
}

export default async function Music({ params }: { params: Promise<{ musicSlug: string }> }) {
  const { musicSlug } = await params
  const { post } = await getPostBySlug(musicSlug)
  const { posts } = await getPostsData("music")
  if (!post) return <div>not here.</div>

  const sorted = (posts ?? []).slice().sort((a, b) => {
    if (a.order === b.order) return 0
    if (a.order === null || a.order === undefined) return 1
    if (b.order === null || b.order === undefined) return -1
    return a.order < b.order ? 1 : -1
  })
  const idx = sorted.findIndex(p => p.slug === musicSlug)
  const prev = idx > 0 ? sorted[idx - 1] : null
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null

  const cover = post.promo?.filename || post.images?.[0]?.filename
  const albumSchema = {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: post.name,
    url: `${SITE_URL}/music/${musicSlug}`,
    byArtist: { "@type": "Person", name: "dl Salo", url: SITE_URL },
    ...(post.seo ? { description: post.seo } : {}),
    ...(cover ? { image: absoluteUrl(setImage(cover)) } : {}),
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <JsonLd data={albumSchema} />
      <div>
        <Link href="/music" className="text-sm">
          {`<= all music`}
        </Link>
      </div>

      <div className="flex flex-col gap-4 items-center md:p-8 p-2 rounded-sm bg-off-white shadow-lg card-ink">
        <h1 className="dark:text-black">{post.name}</h1>

        <div className="w-full flex flex-col items-center md:bg-black rounded-md md:p-8">
          {post.embed && (
            <div
              className="rounded-xs p-2 flex flex-col items-center w-full"
              dangerouslySetInnerHTML={{ __html: post.embed?.toString() }}
            />
          )}
        </div>
        {post?.content?.document && <DocumentRenderer document={post.content?.document} />}
        {post?.promo?.filename && (
          <Image
            src={setImage(post.promo.filename)}
            alt={post.promo.altText || "dl salo"}
            width={800}
            height={800}
            className="w-full"
          />
        )}
      </div>

      <div className="flex flex-row justify-between gap-4 text-sm text-black">
        <div className="flex-1">
          {prev && (
            <Link href={`/music/${prev.slug}`} className="block">
              {`<=`} {prev.name}
            </Link>
          )}
        </div>
        <div className="flex-1 text-right">
          {next && (
            <Link href={`/music/${next.slug}`} className="block">
              {next.name} {`=>`}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
