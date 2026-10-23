import { getPostBySlug, getPostsData } from "@/lib/getPosts"
import { releaseProjects } from "@/lib/projects"
import { getUpcomingPerformances } from "@/lib/performances"
import { UpcomingShows } from "@/components/UpcomingShows"
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
  params: Promise<{ projectSlug: string }>
}): Promise<Metadata> {
  const { projectSlug } = await params
  const { post } = await getPostBySlug(projectSlug)
  const cover = post?.promo?.filename || post?.images?.[0]?.filename
  return pageMetadata({
    title: post?.name,
    description: describe(
      post,
      post?.name
        ? `${post.name}: a project featuring composer dl Salo.`
        : "Projects featuring composer dl Salo.",
    ),
    path: `/projects/${projectSlug}`,
    image: ogImage(cover),
  })
}

export default async function Post({ params }: { params: Promise<{ projectSlug: string }> }) {
  const { projectSlug } = await params
  const { post } = await getPostBySlug(projectSlug)
  if (!post) notFound()
  const upcoming = getUpcomingPerformances(projectSlug)
  const { posts: music } = await getPostsData("music")
  const releases = (music ?? []).filter(m => m.slug && releaseProjects[m.slug] === projectSlug)

  const cover = post.promo?.filename || post.images?.[0]?.filename
  const description = describe(post, "")
  const groupSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: post.name,
    url: absoluteUrl(`/projects/${projectSlug}`),
    member: personRef,
    ...(description ? { description } : {}),
    ...(cover ? { image: absoluteUrl(setImage(cover)) } : {}),
  }

  return (
    <div className="flex flex-col gap-2">
      <JsonLd data={groupSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Projects", path: "/projects" },
          { name: post.name ?? projectSlug, path: `/projects/${projectSlug}` },
        ])}
      />
      <div className="mb-4">
        <Link href={`/projects`} className="hover:font-corrected">{`<-- projects`}</Link>
      </div>
      <h1>{post?.name}</h1>
      {post?.description?.document && <DocumentRenderer document={post?.description?.document} />}
      <UpcomingShows shows={upcoming} className="mt-8" />
      {releases.length > 0 && (
        <div className="mt-8">
          <div className="text-sm uppercase tracking-wide opacity-70 mb-4">Releases</div>
          <div className="flex flex-col gap-1">
            {releases.map(release => (
              <Link key={release.slug} href={`/music/${release.slug}`}>
                {release.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="flex md:flex-row flex-col gap-2 mt-8">
        {post?.images &&
          post.images.map(image => (
            <div key={image.filename} className="max-w-sm">
              {image.filename && (
                <Link href={`/images/${image.filename}`} target="_blank">
                  <Image
                    src={setImage(image.filename)}
                    alt={image.altText || post.name || "dl Salo project"}
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
