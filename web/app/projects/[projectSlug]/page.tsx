import { getProjectBySlug } from "@/lib/getProjects"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Link from "next/link"

export default async function Page({ params }: { params?: any }) {
  const { project } = await getProjectBySlug(params.projectSlug)

  return (
    <div>
      <div className="mb-4">
        <Link href={`/projects`} className="hover:font-corrected">{`<-- projects`}</Link>
      </div>
      <h1>{project?.name}</h1>
      <DocumentRenderer document={project?.description?.document} />
    </div>
  )
}
