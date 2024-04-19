import Hero from "@/components/main/Hero";
import AboutMe from "@/components/sub/AboutMe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "About Haariharan Rajakumar"
};

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <AboutMe />
    </div>
  );
}
