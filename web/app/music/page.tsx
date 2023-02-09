import { getProjectsData } from "@/lib/getProjects"
import { DocumentRenderer } from "@keystone-6/document-renderer"

export default async function Music() {
  const { projects } = await getProjectsData("music")
  return (
    <div>
      <div className="flex flex-col place-content-center items-center justify-center text-center w-full gap-20">
        {projects &&
          projects.map(project => (
            <div key={project.name} className="flex flex-col gap-4 max-w-4xl">
              <div>{project.name}</div>
              <div>
                {project.embed && (
                  <div
                    className="Container"
                    dangerouslySetInnerHTML={{ __html: project.embed?.toString() }}
                  />
                )}
              </div>
              <DocumentRenderer document={project.content?.document} />
              <div className="text-center">-------</div>
            </div>
          ))}
      </div>
    </div>
  )
}
