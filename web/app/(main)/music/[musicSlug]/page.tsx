import { getPostBySlug, getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import { projectRef, releaseProjects } from "@/lib/projects"
import { releaseDates } from "@/lib/releaseDates"
import {
  absoluteUrl,
  breadcrumbSchema,
  describe,
  ogImage,
  pageMetadata,
  personRef,
  SITE_URL,
} from "@/lib/seo"
import { JsonLd } from "@/components/JsonLd"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ musicSlug: string }>
}): Promise<Metadata> {
  const { musicSlug } = await params
  const { post } = await getPostBySlug(musicSlug)
  const cover = post?.promo?.filename || post?.images?.[0]?.filename
  return pageMetadata({
    title: post?.name,
    description: describe(
      post,
      post?.name ? `${post.name}: music by composer dl Salo.` : "Music by composer dl Salo.",
    ),
    path: `/music/${musicSlug}`,
    image: ogImage(cover),
    type: "music.album",
  })
}

export default async function Music({ params }: { params: Promise<{ musicSlug: string }> }) {
  const { musicSlug } = await params
  const { post } = await getPostBySlug(musicSlug)
  const { posts } = await getPostsData("music")
  if (!post) notFound()

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
  const project = releaseProjects[musicSlug]
  const description = describe(post, "")
  const albumSchema = {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: post.name,
    url: `${SITE_URL}/music/${musicSlug}`,
    byArtist: project
      ? {
          "@type": "MusicGroup",
          name: projectRef(project).name,
          url: absoluteUrl(`/projects/${project}`),
          member: personRef,
        }
      : personRef,
    ...(releaseDates[musicSlug] ? { datePublished: releaseDates[musicSlug] } : {}),
    ...(description ? { description } : {}),
    ...(cover ? { image: absoluteUrl(setImage(cover)) } : {}),
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <JsonLd data={albumSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Music", path: "/music" },
          { name: post.name ?? musicSlug, path: `/music/${musicSlug}` },
        ])}
      />
      <div>
        <Link href="/music" className="text-sm">
          {`<= all music`}
        </Link>
      </div>

      <div className="flex flex-col gap-4 items-center md:p-8 p-2 rounded-sm bg-off-white shadow-lg card-ink">
        <h1 className="dark:text-black">{post.name}</h1>
        {project && (
          <Link href={`/projects/${project}`} className="dark:text-black">
            {projectRef(project).name}
          </Link>
        )}

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
            alt={post.promo.altText || `${post.name} artwork`}
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
