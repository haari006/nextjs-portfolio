import ProjectCard from "@/components/sub/ProjectCard";
import { PlanetTitleText } from "@/components/sub/SkillText";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects",
  description: "List of projects by Haariharan Rajakumar",
};

export default function PlanetsPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-10 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8">
        <PlanetTitleText />
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 px-2 md:px-4 lg:px-8">
          <ProjectCard
            src="/worldExpo1.png"
            title="World Expo 2025 Monitoring Dashboard"
            description="A web app that provides monitoring of the World Expo 2025, including impressive statistics of their ads and social media presence."
            link="planets/worldExpo-my"
          />
          <ProjectCard
            src="/insuredSpeaks1.png"
            title="InsuredSpeaks"
            description="A web app that allows users to share their insurance experiences and read others' reviews."
            link="planets/insuredspeaks"
          />
          <ProjectCard
            src="/lifepath1.png"
            title="LifePath - Educational consulting platform"
            description="LifePath is an educational consulting platform that connects students with lifepath experts to guide them in their academic and career paths."
            link="planets/lifepath"
          />
          <ProjectCard
            src="/jp1.PNG"
            title="Landing Page for Coconut Bussiness"
            description="A sleek and responsive landing page designed for a coconut business."
            link="planets/coconut-landing-page"
          />
          <ProjectCard
            src="/maths-generator.jpeg"
            title="Maths Question Generator"
            description="A web app that generates math questions for students to practice"
            link="planets/maths-generator"
          />
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
        </div>
      </div>
    </div>
  );
}

