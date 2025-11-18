"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
      className="group relative w-full max-w-sm bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:shadow-xl overflow-hidden"
      onClick={() => navigate.push(link)}
      type="button"
      aria-label={`View project: ${title}`}
    >
      <div className="relative overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
        <Image
          src={src}
          alt={title}
          layout="responsive"
          width={500}
          height={280}
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 text-left">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 line-clamp-3 text-left leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-orange-600 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
            View Project
          </span>
          <svg
            className="w-4 h-4 text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-black backdrop-blur-sm rounded-full p-2 shadow-lg">
          <svg
            className="w-4 h-4 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;
