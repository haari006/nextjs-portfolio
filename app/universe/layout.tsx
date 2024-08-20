import Navbar from "@/components/main/Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex flex-col min-h-screen w-full" id="about-me">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-auto z-10 object-cover rotate-180 interstellar-effect -mt-[50px]"
          style={{ maxHeight: '100vh' }}
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video>
        <div className="relative z-20 gradient-background">
          <Navbar>{children}</Navbar>
        </div>
      </div>
    </>
  );
}


  