import { AllProjectsDocument, ProjectBySlugDocument } from "@/graphql/generated/graphql"
import { graphqlClient } from "@/lib/graphql-client"

export const getProjectsData = async () => {
  const res = await graphqlClient.request(AllProjectsDocument)
  return res
}

export const getProjectBySlug = async (slug: string) => {
  const res = await graphqlClient.request(ProjectBySlugDocument, {
    slug: slug,
  })
  console.log(res)
  return res
}
