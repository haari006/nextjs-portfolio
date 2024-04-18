"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import Footer from "./Footer";

import { Menu } from '@headlessui/react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ children }: { children: React.ReactNode }) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  const navigation = [
    {
      name: "Universe",
      path: "/universe",
    },
    {
      name: "Stars",
      path: "/universe/stars",
      current: false,
    },
    {
      name: "Planets",
      path: "/universe/planets",
    },
  ];

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: item.path === pathName
  }));

  return (
    <div className="w-full">
    <div className="w-full fixed top-0 left-0 z-50 px-4 shadow-lg bg-black/30 backdrop-blur-md">
      <div className="flex h-[65px] items-center justify-between mx-auto max-w-screen-xl">
        <a href="/universe" className="flex items-center">
          <Image src="/RK.png" alt="logo" width={70} height={70} className="cursor-pointer hover:animate-slowspin" />
        </a>
        {/* Mobile Menu Toggle */}
        <button className="md:hidden px-2 py-1 rounded-md text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center">
          <ul className="flex flex-row gap-x-5 items-center">
            {updatedNavigation.map((item) => (
              <li key={item.name} className="list-none">
                <Link href={item.path} className={classNames(
                  item.current ? "bg-gray-800 text-white" : "text-white hover:text-white hover:underline",
                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                )}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:flex flex-row gap-5">
          {Socials.map((social) => (
            <Image src={social.src} alt={social.name} key={social.name} width={24} height={24} className="cursor-pointer" onClick={() => window.open(social.link)} />
          ))}
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/80 px-4 py-10">
            <ul className="flex flex-col items-center gap-4">
              {updatedNavigation.map((item) => (
                <li key={item.name} className="text-center text-white">
                  <Link href={item.path} className="text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-row justify-center gap-5 mt-8">
              {Socials.map((social) => (
                <Image src={social.src} alt={social.name} key={social.name} width={24} height={24} className="cursor-pointer bg-white border-white" onClick={() => window.open(social.link)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <main className="pt-[85px] flex-1 w-full">{children}</main>
  </div>
  );
};


export default Navbar;