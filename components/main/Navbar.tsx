"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";
import Footer from "./Footer";

import { Menu } from '@headlessui/react';
import Link from "next/link";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const navigation = [
    {
      name: "Universe",
      path: "/universe",
      current: true,
    },
    {
      name: "Stars",
      path: "/universe/stars",
      current: false,
    },
    {
      name: "Planets",
      path: "/universe/planets",
      current: false,
    },
  ];

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full h-[65px] fixed top-0 left-0 z-50 px-10 shadow-lg shadow-orange-600/50 bg-black/30 backdrop-blur-md">
        <div className="flex h-full items-center justify-between px-[10px] mx-auto max-w-screen-xl">
          <a href="/universe" className="flex items-center">
            <Image
              src="/RK.png"
              alt="logo"
              width={70}
              height={70}
              className="cursor-pointer hover:animate-slowspin"
            />
          </a>

          <nav className="flex justify-center">
            <ul className="flex flex-row gap-x-5 items-center">
              {navigation.map((item) => (
                <li key={item.name} className="list-none">
                  <Link
                    href={item.path}
                    className={classNames(
                      item.current
                        ? "bg-gray-800 text-white"
                        : "text-white hover:text-white hover:underline",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

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
      <main className="pt-[85px] flex-1 w-full">{children}</main>
    </div>
  );
};


export default Navbar;