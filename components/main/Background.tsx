"use client";

import { education, jobs } from "@/constants";
import { List } from "./Education";
import {motion} from 'framer-motion'

export default function Background() {

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: 0.3, duration: 0.5 }
        }
      };
      
    return (
<div className="flex flex-col items-center justify-center mb-10">
  <div>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
        >
          Education
        </motion.h2>
        <List data={education} />
      </div>
      <div>
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
        >
          Work Experience
        </motion.h2>
        <List data={jobs} />
      </div>
    </motion.div>
  </div>
</div>

    );
  }