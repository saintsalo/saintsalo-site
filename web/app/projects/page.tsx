import { getProjectsData } from "@/lib/getProjects"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"

export default async function Collaborators() {
  const { projects } = await getProjectsData("project")
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 items-stretch bg-[#f8f5ee]">
        {projects &&
          projects.map(project => (
            <div key={project.name}>
              <Link
                href={`/projects/${project.slug}`}
                className="hover:contrast-150 transition-all shadow-sm hover:shadow-lg p-4  border-transparent rounded-md flex flex-col gap-2 relative"
              >
                <div className="hover:font-corrected">{project.name}</div>

                {project.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image.image?.publicUrl || "/"}
                    alt={image.altText || "need alt text"}
                    width={800}
                    height={800}
                  />
                ))}
                <DocumentRenderer document={project.content?.document} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}
