import { getProjectsData } from "@/lib/getProjects"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"

export default async function Collaborators() {
  const { projects } = await getProjectsData()
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 items-stretch bg-[#f8f5ee]">
        {projects &&
          projects.map(project => (
            <div key={project.name} className="flex flex-col max-w-md gap-2">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:contrast-150 transition-all shadow-sm hover:shadow-lg p-4 border-2 hover:border-red-400 border-transparent rounded-md"
              >
                <div className="hover:font-corrected">{project.name}</div>

                {project.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image.image?.publicUrl || "/"}
                    alt={image.altText || "need alt text"}
                    width={400}
                    height={400}
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
