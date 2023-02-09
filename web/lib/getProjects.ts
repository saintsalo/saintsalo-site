import { AllProjectsDocument, ProjectBySlugDocument } from "@/graphql/generated/graphql"
import { graphqlClient } from "@/lib/graphql-client"

export const getProjectsData = async (type: "news" | "music" | "project") => {
  const res = await graphqlClient.request(AllProjectsDocument, {
    status: "live",
    type,
  })
  return res
}

export const getProjectBySlug = async (slug: string) => {
  const res = await graphqlClient.request(ProjectBySlugDocument, {
    slug: slug,
  })
  console.log(res)
  return res
}
