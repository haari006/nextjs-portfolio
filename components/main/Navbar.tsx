"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";

const Navbar = () => {
    return (
      <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-orange-500/50 bg-black/30 backdrop-blur-md z-50 px-10">
        <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
          <a
            href="#about-me"
            className="h-auto w-auto flex flex-row items-center"
          >
            <Image
              src="/RK.png"
              alt="logo"
              width={70}
              height={70}
              className="cursor-pointer hover:animate-slowspin"
            />

            <span className="font-bold ml-[10px] hidden md:block text-gray-300">
              Haariharan Rajakumar
            </span>
          </a>

          <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
            <div className="flex items-center justify-between w-full text-gray-200">
              <a href="#about-me" className="cursor-pointer hover:scale-110 transition-all ease-in-out">
                Universe
              </a>
              <a href="#skills" className="cursor-pointer hover:scale-110 transition-all ease-in-out">
                Stars
              </a>
              <a href="#projects" className="cursor-pointer hover:scale-110 transition-all ease-in-out">
                Planets
              </a>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            {Socials.map((social) => (
              <Image
                src={social.src}
                alt={social.name}
                key={social.name}
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => window.open(social.link)}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Navbar;