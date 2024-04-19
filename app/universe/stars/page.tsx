import Hero from "@/components/main/Hero";
import AboutMe from "@/components/sub/AboutMe";
import Stars from "@/components/sub/Stars";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Skills",
    description: "Skills accquired by Haariharan Rajakumar"
  };

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Stars />
    </div>
  );
}
