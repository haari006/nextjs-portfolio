"use client";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import PlanetCarousel from "./PlanetCarousel";
import Image from "next/image";

const PlanetPreviewComponent = ({ planet }: { planet: Planet }) => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const handleVisit = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="min-h-screen bg-transparent bg-gradient-to-b via-black to-gray-800">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Project Header Section */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                {planet.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                {planet.description}
              </p>
              {planet.remark && (
                <p className="text-gray-400 text-base leading-relaxed">
                  {planet.remark}
                </p>
              )}
            </div>

            <div className="flex-shrink-0">
              <button
                type="button"
                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
                onClick={() =>
                  handleVisit(
                    planet.link ?? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  )
                }
              >
                <span className="mr-2">Visit Project</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel Section */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
            <PlanetCarousel images={planet.images} />
          </div>

          {/* Tech Stack Section */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
            <Tab.Group as="div">
              {/* Tab Navigation */}
              <div className="border-b border-gray-700/50 px-6">
                <Tab.List className="flex space-x-8 -mb-px">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-orange-500 text-orange-400 bg-orange-500/10"
                          : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600",
                        "whitespace-nowrap border-b-2 py-4 px-6 text-sm font-semibold rounded-t-lg transition-all duration-200"
                      )
                    }
                  >
                    Frameworks
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-orange-500 text-orange-400 bg-orange-500/10"
                          : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600",
                        "whitespace-nowrap border-b-2 py-4 px-6 text-sm font-semibold rounded-t-lg transition-all duration-200"
                      )
                    }
                  >
                    Cloud Development
                  </Tab>
                </Tab.List>
              </div>

              {/* Tab Panels */}
              <Tab.Panels className="p-6">
                <Tab.Panel>
                  <h3 className="sr-only">Frameworks</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {planet.frameworks?.map((detail) => (
                      <div
                        key={detail.name}
                        className="group flex flex-col items-center p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:border-orange-500/50 hover:bg-gray-700/40 transition-all duration-300 hover:scale-105"
                      >
                        <div className="w-16 h-16 flex items-center justify-center mb-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                          <Image
                            src={detail.Image}
                            width={40}
                            height={40}
                            alt={detail.name}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-300 text-center group-hover:text-white transition-colors duration-200">
                          {detail.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <h3 className="sr-only">Cloud Development</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {planet.cloud?.map((detail) => (
                      <div
                        key={detail.name}
                        className="group flex flex-col items-center p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:border-orange-500/50 hover:bg-gray-700/40 transition-all duration-300 hover:scale-105"
                      >
                        <div
                          className={`w-16 h-16 flex items-center justify-center mb-3 rounded-lg group-hover:scale-110 transition-transform duration-300 ${
                            detail.name === "Vercel"
                              ? "bg-white"
                              : "bg-white/10 group-hover:bg-white/20"
                          }`}
                        >
                          <Image
                            src={detail.Image}
                            width={detail.width || 40}
                            height={detail.width || 40}
                            alt={detail.name}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-300 text-center group-hover:text-white transition-colors duration-200">
                          {detail.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetPreviewComponent;