"use client";

import {
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Other_skill,
  Skill_data,
} from "@/constants";
import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText, {
  BackendSkillText,
  DevOpsSkillText,
  FrontentSkillText,
  SkillTitleText,
} from "../sub/SkillText";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";

const Stars = () => {
  return (
    <section
      id="skills"
      className="relative min-h-screen py-20 overflow-hidden bg-transparent bg-gradient-to-b via-black to-gray-800"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <SkillTitleText />
        </motion.div>

        {/* Skills Sections */}
        <div className="space-y-16">
          {/* Backend Skills */}
          <motion.div
            variants={slideInFromLeft(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="skill-section"
          >
            <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <BackendSkillText />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {Backend_skill.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex flex-col items-center p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:border-orange-500/50 hover:bg-gray-700/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20">
                      <div className="w-12 h-12 flex items-center justify-center mb-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                        <SkillDataProvider
                          src={skill.Image}
                          width={skill.width}
                          height={skill.height}
                          index={index}
                          name={skill.skill_name}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-300 text-center group-hover:text-white transition-colors duration-200 line-clamp-2">
                        {skill.skill_name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Frontend Skills */}
          <motion.div
            variants={slideInFromRight(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="skill-section"
          >
            <div className="bg-gradient-to-l from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <FrontentSkillText />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {Frontend_skill.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex flex-col items-center p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:border-orange-500/50 hover:bg-gray-700/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20">
                      <div className="w-12 h-12 flex items-center justify-center mb-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                        <SkillDataProvider
                          src={skill.Image}
                          width={skill.width}
                          height={skill.height}
                          index={index}
                          name={skill.skill_name}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-300 text-center group-hover:text-white transition-colors duration-200 line-clamp-2">
                        {skill.skill_name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* DevOps Skills */}
          <motion.div
            variants={slideInFromLeft(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="skill-section"
          >
            <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <DevOpsSkillText />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {Other_skill.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex flex-col items-center p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:border-orange-500/50 hover:bg-gray-700/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20">
                      <div className="w-12 h-12 flex items-center justify-center mb-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                        <SkillDataProvider
                          src={skill.Image}
                          width={skill.width}
                          height={skill.height}
                          index={index}
                          name={skill.skill_name}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-300 text-center group-hover:text-white transition-colors duration-200 line-clamp-2">
                        {skill.skill_name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Optional: Uncomment for video background */}
      {/* 
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full z-[-10] opacity-20 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto object-cover"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          />
        </div>
      </div> 
      */}
    </section>
  );
};

export default Stars;
