import ProjectCard from "@/components/sub/ProjectCard";
import { PlanetTitleText } from "@/components/sub/SkillText";

export default function PlanetsPage() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="py-20">
        <PlanetTitleText/>
        <div className="flex flex-wrap justify-center gap-10 px-10">
          <ProjectCard
            src="/pystorm1.webp"
            title="Pystorm SaaS App"
            description="3D Portfolio Website made with React, Vite, Three JS, and TailwindCSS."
            link="planets/pystorm-saas"
          />
          <ProjectCard
            src="/pystorm-dashboard3.jpeg"
            title="Pystorm Dashboard"
            description="Stock Price Prediction with LSTM is a machine learning project that uses LSTM, a type of recurrent neural network, to predict stock prices."
            link="planets/pystorm-dashboard"
          />
        </div>
      </div>
    </div>
  );
}
