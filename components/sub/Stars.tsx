import {
    Backend_skill,
    Frontend_skill,
    Full_stack,
    Other_skill,
    Skill_data,
} from "@/constants";
import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText, { BackendSkillText, DevOpsSkillText, FrontentSkillText, SkillTitleText } from "../sub/SkillText";
import {motion} from 'framer-motion'
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'

const Stars = () => {
    return (
      <section
        id="skills"
        className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden pb-80 py-20"
        style={{ transform: "scale(0.9" }}
      >
        <SkillTitleText/>

        <div className="flex flex-col justify-center mt-4 gap-5 items-center">
          <BackendSkillText />
          <div className="flex flex-row justify-around flex-wrap gap-5 items-center">
            {Backend_skill.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center mt-4 gap-5 items-center">
          <FrontentSkillText />
          <div className="flex flex-row justify-around flex-wrap gap-5 items-center">
            {Frontend_skill.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center mt-4 gap-5 items-center">
          <DevOpsSkillText />
          <div className="flex flex-row justify-around flex-wrap gap-5 items-center">
            {Other_skill.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* <div className="w-full h-full absolute">
                <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
                    <video
                        className="w-full h-auto"
                        preload="false"
                        playsInline
                        loop
                        muted
                        autoPlay
                        src="/cards-video.webm"
                    />
                </div>
            </div> */}
      </section>
    );
};

export default Stars;