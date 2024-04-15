import React from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px] h-full w-full left-0 z-10 object-cover interstellar-effect"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>
      <div className="absolute top-[-340px] left-0 h-full w-full z-20 gradient-background"></div>
      <HeroContent />
    </div>
  );
};

export default Hero;