import Link from "next/link";
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
          <Link
            href="/universe/planets/new"
            className="inline-flex items-center gap-2 rounded-lg border border-orange-500/60 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/20"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-gray-800 bg-black/60 p-10 text-center">
            <p className="text-base text-gray-300">
              No projects found yet. Use the “Add project” button to publish your first one instantly.
            </p>
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
