import PlanetPreviewComponent from "@/components/sub/PlanetPreview";
import { Planets } from "@/constants";
import { Metadata } from "next";

  export async function generateMetadata({
    params,
  }: {
    params: { id: string };
  }): Promise<Metadata> {
    const { id } = params;
    const planet: Planet = Planets.find((planet) => planet.id === id)!;

    if (!planet) {
      return {
        title: "No Planet Found",
        description: "The requested planet was destroyed by the Death Star",
      };
    }

    return {
      title: planet.name as string,
      description: planet.name as string,
    };
  }

export default function PlanetsPage({params}:{params:{id:string}}) {
    const {id} = params;
    const planet: Planet = Planets.find((planet) => planet.id === id)!;
    return (
      <div className="flex flex-col gap-20">
        <PlanetPreviewComponent planet={planet} />
      </div>
    );
  }