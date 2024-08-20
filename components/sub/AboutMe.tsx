"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    slideInFromLeft,
    slideInFromRight,
} from "@/utils/motion";
import Image from "next/image";

const AboutMe = () => {
  return (
      <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 mt-20 md:mt-40 mb-10 md:mb-20 w-full z-[20]"
      >
          <motion.div
              className="h-full w-full flex flex-col gap-5 justify-center text-center md:text-start m-auto glass-effect bg-orange-200/10 backdrop-blur-lg rounded-lg p-6 md:p-8 shadow-lg"
              variants={slideInFromLeft(0.5)}
          >
              <div>
                  <motion.div
                      variants={slideInFromLeft(0.5)}
                      className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-6 text-4xl md:text-6xl font-bold text-white max-w-[100%] md:max-w-[600px] w-auto h-auto"
                  >
                      <span>
                          About
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                              {" "}
                              ME{" "}
                          </span>
                      </span>
                  </motion.div>

                  <motion.div
                      variants={slideInFromLeft(0.8)}
                      className="text-sm md:text-lg text-gray-400 my-4 md:my-5 max-w-[100%] md:max-w-[600px] space-y-4"
                  >
                      <div>
                          I began my career as a Backend Developer specializing in Spring Boot
                          in 2023, initially working as an intern at a startup. As the sole
                          technical member of the team, I quickly embraced multiple
                          responsibilities and began to self-learn various technologies to
                          enhance my productivity. Eager to expand my skill set, I acquired
                          proficiency in React, Node.js, MongoDB, Express, Next.js,
                          TypeScript, among others.
                      </div>

                      <div>
                          Recognized for my quick learning capabilities, I progressively
                          transitioned into a Full Stack Developer role. This shift enabled me
                          to independently develop and test APIs, further solidifying my
                          front-end development skills, particularly in React and Next.js. I
                          have extensive experience with MongoDB, Express, and Node.js, and
                          appreciate how TypeScript enhances code clarity and maintainability.
                      </div>

                      <div>
                          In addition to programming, I have practical experience deploying
                          applications using AWS, Docker, and Azure, and managing databases
                          like MySQL, PostgreSQL, and MongoDB. I possess extensive knowledge of Firebase and Supabase, which I utilize for creating robust CRUD operations.
                      </div>
                  </motion.div>
              </div>
          </motion.div>

          <motion.div
              variants={slideInFromRight(0.8)}
              className="hidden md:flex w-full h-full justify-center items-center"
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

export default AboutMe;