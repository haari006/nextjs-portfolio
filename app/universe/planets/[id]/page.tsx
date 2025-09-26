import { Metadata } from "next";
import { notFound } from "next/navigation";
import PlanetPreviewComponent from "@/components/sub/PlanetPreview";
import { fetchProjectById } from "@/lib/projectStore";

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = await fetchProjectById(params.id);

  if (!project) {
    return {
      title: "Project not found",
      description: "The project you are looking for does not exist.",
    };
  }

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function PlanetsPage({ params }: Params) {
  const project = await fetchProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      <PlanetPreviewComponent planet={project} />
    </div>
  );
}
