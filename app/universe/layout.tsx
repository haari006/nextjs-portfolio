import Navbar from "@/components/main/Navbar";


export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex flex-col h-full w-full" id="about-me">
        <video
          autoPlay
          muted
          loop
          className="rotate-180 absolute md:top-[-230px] xl:top-[-390px] h-full w-full left-0 z-10 object-cover interstellar-effect"
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video>
        <div className="absolute left-0 h-full w-full z-20 gradient-background">      <Navbar>{children}</Navbar></div>
      </div>
    </>
  );
}