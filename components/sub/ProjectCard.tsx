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
      className="relative w-full max-w-sm h-auto rounded-lg shadow-lg border border-white hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={() => navigate.push(link)}
      type="button"
    >
      <Image
        src={src}
        alt={title}
        layout="responsive"
        width={500}
        height={300}
        className="object-cover rounded-t-lg"
        loading="lazy"
      />

      <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black to-transparent rounded-b-lg">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-300">{description}</p>
      </div>
    </button>
  );
};

export default ProjectCard;
