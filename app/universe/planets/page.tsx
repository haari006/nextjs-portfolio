import ProjectCard from "@/components/sub/ProjectCard";
import { PlanetTitleText } from "@/components/sub/SkillText";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Projects",
    description: "List of projects by Haariharan Rajakumar",
  };

export default function PlanetsPage() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="py-20">
        <PlanetTitleText/>
        <div className="flex flex-wrap justify-center gap-10 px-10">
          <ProjectCard
            src="/pystorm1.webp"
            title="Pystorm SaaS App"
            description="Pystorm is a SaaS app which offers a user-friendly platform tailored for small businesses to simplify data management and visualization."
            link="planets/pystorm-saas"
          />
          <ProjectCard
            src="/pystorm-dashboard3.jpeg"
            title="Pystorm Dashboard"
            description="A web app that supports multi-tenancy, allowing users to view embedded dashboards that was made to visualize organization data"
            link="planets/pystorm-dashboard"
          />
          <ProjectCard
            src="/nextjslms-1.png"
            title="Learning Management System"
            description="A learning management system prototype where user can do course enrollment"
            link="planets/nextjs-lms"
          />
        </div>
      </div>
    </div>
  );
}
