import Background from "@/components/main/Background";
import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import Skills from "@/components/main/Skills";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Background />
    </div>
  );
}
