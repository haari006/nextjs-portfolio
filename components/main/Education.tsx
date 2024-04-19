"use client";
import { motion } from "framer-motion";

enum Months {
  Jan = 1,
  Feb = 2,
  Mar = 3,
  Apr = 4,
  May = 5,
  Jun = 6,
  Jul = 7,
  Aug = 8,
  Sep = 9,
  Oct = 10,
  Nov = 11,
  Dec = 12,
}

export const List = ({ data }: { data: any }) => {
  return (
    <>
      <div className="w-full md:w-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.2 }}
          className="space-y-4"
        >
          {data?.map((d: any) => (
            <motion.div
              key={d?.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group bg-white bg-opacity-10 border-white p-4 rounded-md hover:bg-opacity-80 border border-gray-200/10 transition duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg text-white font-semibold group-hover:text-gray-900">
                    {d?.company}
                  </h2>
                  <h3 className="text-gray-200 group-hover:text-gray-900">
                    {d?.designation}
                  </h3>
                </div>
                {d?.logo?.url && (
                  <img
                    src={d?.logo?.url}
                    alt={`${d?.company} logo`}
                    className="h-8 mt-1 opacity-100 hover:opacity-50 transition duration-300"
                  />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 group-hover:text-gray-600">
                  {`${Months[parseInt(d?.from?.split("-")[1])]}, ${
                    d?.from?.split("-")[0]
                  }`}
                </span>
                <span className="text-gray-500 group-hover:text-gray-600">
                  {`${Months[parseInt(d?.from?.split("-")[1])]}, ${
                    d?.from?.split("-")[0]
                  }`}{" "}
                  -
                  {d?.to
                    ? `${Months[parseInt(d?.to?.split("-")[1])]}, ${
                        d?.to?.split("-")[0]
                      }`
                    : "Present"}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};
