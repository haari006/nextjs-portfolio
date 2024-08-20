"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 mt-20 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-center md:text-start">
        <motion.div
          variants={slideInFromTop}
          className="flex rounded-full p-4 w-[180px] md:w-[220px] py-[8px] px-[5px] border border-orange-500 opacity-[0.9] mx-auto md:mx-0"
        >
          <SparklesIcon className="text-orange-500 mr-[10px] h-5 w-5" />
          <h1 className="text-orange-500 text-[11px] md:text-[13px]">
            HAARIHARAN RAJAKUMAR
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl md:text-6xl font-bold text-white max-w-[100%] md:max-w-[600px] w-auto h-auto"
        >
          <span>
            Turning
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              {" "}
              Ideas Into{" "}
            </span>
            Reality Through Code.
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-sm md:text-lg text-gray-400 my-5 max-w-[100%] md:max-w-[600px] mx-auto md:mx-0"
        >
          I&apos;ve been a Web Developer for the past year and a half, gaining
          significant experience in web development. Click 'Learn Me' to find
          out more about me.
        </motion.p>
        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 px-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[150px] md:max-w-[200px] mx-auto md:mx-0"
          href="/universe/me"
        >
          Learn Me
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden md:flex w-full h-full justify-center items-center mt-10 md:mt-0"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={500} 
          width={500} 
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]" 
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
