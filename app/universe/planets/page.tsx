import ProjectCard from "@/components/sub/ProjectCard";
import { PlanetTitleText } from "@/components/sub/SkillText";
import { fetchProjects } from "@/lib/projectStore";

const placeholderImage = "/project-placeholder.svg";

export default async function PlanetsPage() {
  const projects = await fetchProjects();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-10 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <PlanetTitleText />
        </div>

        {projects.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-gray-800 bg-black/60 p-10 text-center">
            <p className="text-base text-gray-300">No projects found yet.</p>
          </div>
        ) : (
          <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 px-2 md:px-4 lg:px-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                src={project.images?.[0]?.src ?? placeholderImage}
                title={project.name}
                description={project.description}
                link={`planets/${project.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
