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
    <>
      <div className="">
        <div className="p-4">{/* <BreadCrumb productId={id} /> */}</div>
        <div className="mx-auto px-4 py-10 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8 glass-effect bg-orange-200/10 backdrop-blur-lg rounded-lg p-8 shadow-lg">
          {/* Project */}
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            <PlanetCarousel images={planet.images} />

            {/* Project details */}
            <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="flex items-center justify-between gap-4 mt-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {planet.name}
                  </h1>
                </div>
                <button
                  type="button"
                  className="items-center justify-end rounded-md border border-transparent bg-orange-500 px-3 py-2 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-offset-2 focus:ring-offset-gray-50"
                  style={{ minWidth: "100px" }}
                  onClick={() =>
                    handleVisit(
                      planet.link ??
                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    )
                  }
                >
                  Visit
                </button>
              </div>

              <div className="flex flex-col justify-between tracking-tight mt-10 gap-4">
                <p className="text-sm font-medium text-white leading-relaxed">
                  {planet.description}
                </p>
                <p className="text-sm font-medium text-white leading-relaxed">
                  {planet.remark}
                </p>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                {/* <dl>
        {showFAQ
          ? productPreview.faqs?.map((faq) => (
              <Fragment key={faq.question}>
                <dt className="mt-4 text-sm font-medium text-gray-600">{faq.question}</dt>
                <dd className="prose text-xs prose-sm mt-2 max-w-none text-gray-500">
                  <p>{faq.answer}</p>
                </dd>
              </Fragment>
            ))
          : productPreview.faqs?.slice(0,0).map((faq) => (
              <Fragment key={faq.question}>
                <dt className="mt-4 text-sm font-medium text-gray-600">{faq.question}</dt>
                <dd className="prose text-xs prose-sm mt-2 max-w-none text-gray-500">
                  <p>{faq.answer}</p>
                </dd>
              </Fragment>
            ))}
      </dl> */}

                {/* {productPreview.faqs?.length > 0 && (
        <button
          onClick={toggleShowFAQs}
          className="text-sm font-medium text-sky-600 hover:text-sky-500 cursor-pointer"
        >
          {showFAQ ? 'Read Less' : 'FAQ'}
        </button>
      )} */}
              </div>
            </div>

            <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
              <Tab.Group as="div">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? "border-orange-600 text-white"
                            : "border-transparent text-white hover:border-orange-300",
                          "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                        )
                      }
                    >
                      Frameworks
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? "border-orange-600 text-white"
                            : "border-transparent text-gray-100 hover:border-orange-300",
                          "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                        )
                      }
                    >
                      Cloud Development
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="">
                    <h3 className="sr-only">Frameworks</h3>

                    <dl className="grid grid-cols-2 gap-1">
                      {planet.frameworks?.map((detail) => (
                        <Fragment key={detail.name}>
                          <div className="flex flex-col items-center">
                            <dt className="mt-10 font-medium text-white text-center">
                              {detail.name}
                            </dt>
                            <dd className="prose prose-sm mt-2 text-gray-500">
                              <Image
                                src={detail.Image}
                                width={50}
                                height={50}
                                alt="Frameworks"
                              />
                            </dd>
                          </div>
                        </Fragment>
                      ))}
                    </dl>
                  </Tab.Panel>

                  <Tab.Panel className="">
                    <h3 className="sr-only">Cloud Development</h3>

                    <dl className="grid grid-cols-2 gap-1">
                      {planet.cloud?.map((detail) => (
                        <Fragment key={detail.name}>
                          <div className="flex flex-col items-center">
                            <dt className="mt-10 font-medium text-white text-center">
                              {detail.name}
                            </dt>
                            <dd
                              className={`${
                                detail.name === "Vercel" ? "bg-white" : ""
                              } prose prose-sm mt-2 text-gray-500 p-1`}
                            >
                              <Image
                                src={detail.Image}
                                width={detail.width}
                                height={detail.width}
                                alt="clouds"
                              />
                            </dd>
                          </div>
                        </Fragment>
                      ))}
                    </dl>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanetPreviewComponent;
