"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Menu } from '@headlessui/react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();

  const navigation = [
    { name: "Universe", path: "/universe" },
    { name: "Stars", path: "/universe/stars" },
    { name: "Planets", path: "/universe/planets" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: item.path === pathName
  }));

  return (
    <div className="w-full">
      <div className={`w-full fixed top-0 left-0 z-50 px-4 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="flex h-[65px] items-center justify-between mx-auto max-w-screen-xl">
          <a href="/universe" className="flex items-center">
            <Image src="/RK.png" alt="logo" width={50} height={50} className="cursor-pointer hover:animate-slowspin" />
          </a>
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden px-2 py-1 rounded-md text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center">
            <ul className="flex flex-row gap-x-5 items-center">
              {updatedNavigation.map((item) => (
                <li key={item.name} className="list-none">
                  <Link href={item.path} className={classNames(
                    item.current ? "bg-gray-800 text-white" : "text-white hover:text-white hover:underline",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition-colors duration-200"
                  )}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:flex flex-row gap-5">
            {Socials.map((social) => (
              <Image 
                src={social.src} 
                alt={social.name} 
                key={social.name} 
                width={24} 
                height={24} 
                className="cursor-pointer transition-transform duration-200 hover:scale-110" 
                onClick={() => window.open(social.link)} 
              />
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/95 px-4 py-10 transition-opacity duration-300">
          <div className="flex flex-col h-full">
            <ul className="flex flex-col items-center gap-6 mt-10">
              {updatedNavigation.map((item) => (
                <li key={item.name} className="text-center">
                  <Link 
                    href={item.path} 
                    className={`text-xl ${item.current ? 'text-white font-bold' : 'text-gray-300'} hover:text-white transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-row justify-center gap-8 mt-auto mb-10">
              {Socials.map((social) => (
                <Image 
                  src={social.src} 
                  alt={social.name} 
                  key={social.name} 
                  width={28} 
                  height={28} 
                  className="cursor-pointer transition-transform duration-200 hover:scale-110" 
                  onClick={() => window.open(social.link)} 
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <main className="pt-[85px] flex-1 w-full">{children}</main>
    </div>
  );
};


export default Navbar;