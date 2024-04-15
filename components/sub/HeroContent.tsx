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
        className="items-center justify-center px-20 mt-40 mb-20 w-full z-[20]"
      >
        <motion.div
          className="h-full w-full flex flex-col gap-5 justify-center text-start m-auto glass-effect bg-orange-200/10 backdrop-blur-lg rounded-lg p-8 shadow-lg"
          variants={slideInFromLeft(0.5)}
        >
            <div>
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          >
            <span>
              About
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                {" "}
                ME{" "}
              </span>
            </span>
          </motion.div>

          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-lg text-gray-400 my-5 max-w-[600px] space-y-4"
          >
            <p>I began my career as a Backend Developer specializing in Spring Boot
            in 2023, initially working as an intern at a startup. As the sole
            technical member of the team, I quickly embraced multiple
            responsibilities and began to self-learn various technologies to
            enhance my productivity. Eager to expand my skill set, I acquired
            proficiency in React, Node.js, MongoDB, Express, Next.js,
            TypeScript, among others.</p> <br></br>

            <p>Recognized for my quick learning capabilities, I progressively
            transitioned into a Full Stack Developer role. This shift enabled me
            to independently develop and test APIs, further solidifying my
            front-end development skills, particularly in React and Next.js. I
            have extensive experience with MongoDB, Express, and Node.js, and
            appreciate how TypeScript enhances code clarity and maintainability.
            </p><br></br>

            <p>In addition to programming, I have practical experience deploying
            applications using AWS, Docker, and Azure, and managing databases
            like MySQL, PostgreSQL, and MongoDB. I possess extensive knowledge of Firebase and Supabase, which I utilize for creating robust CRUD operations.</p><br></br>
          </motion.p>
          </div>
        </motion.div>

        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full h-full flex justify-center items-center"
        ></motion.div>
      </motion.div>
    );
};

export default HeroContent;