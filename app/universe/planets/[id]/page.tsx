import PlanetPreviewComponent from "@/components/sub/PlanetPreview";
import { Planets } from "@/constants";

export default function PlanetsPage({params}:{params:{id:string}}) {
    const {id} = params;
    const planet: Planet = Planets.find((planet) => planet.id === id)!;
    return (
      <div className="flex flex-col gap-20">
        <PlanetPreviewComponent planet={planet} />
      </div>
    );
  }