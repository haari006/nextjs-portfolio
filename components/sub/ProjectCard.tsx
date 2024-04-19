"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
  link: string;
}

const ProjectCard = ({ src, title, description, link }: Props) => {
    const navigate = useRouter();
  return (
    <button
      className="relative w-[500px] h-[300px] rounded-lg shadow-lg border border-white hover:scale-105 transition duration-300 ease-in-out xs:w-1/2"
      onClick={() => navigate.push(link)}
      type="button"
    >
      <Image
        src={src}
        alt={title}
        width={700}
        height={700}
        className="w-full h-full object-contain"
        loading="lazy"
      />

      <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black to-transparent">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </button>
  );
};

export default ProjectCard;
