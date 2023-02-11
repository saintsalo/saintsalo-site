import { AllPostsDocument, PostBySlugDocument } from "@/graphql/generated/graphql"
import { graphqlClient } from "@/lib/graphql-client"

export const getPostsData = async (type: "news" | "music" | "project") => {
  const res = await graphqlClient.request(AllPostsDocument, {
    status: "live",
    type,
  })
  return res
}

export const getPostBySlug = async (slug: string) => {
  const res = await graphqlClient.request(PostBySlugDocument, {
    slug: slug,
  })
  return res
}
