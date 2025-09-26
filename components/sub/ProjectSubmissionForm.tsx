"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { createProject } from "@/actions/projects";
import type {
  ProjectCloudProvider,
  ProjectImage,
  ProjectTechnology,
} from "@/constants/type";

interface FormStatus {
  type: "idle" | "success" | "error";
  message: string;
}

interface ImageField {
  file: File | null;
  fileName: string;
  width: string;
  height: string;
}

interface TechnologyField {
  name: string;
  Image: string;
  width: string;
  height: string;
}

interface CloudField {
  name: string;
  Image: string;
  width: string;
  height: string;
}

const createEmptyImage = (): ImageField => ({
  file: null,
  fileName: "",
  width: "",
  height: "",
});
const createEmptyTechnology = (): TechnologyField => ({
  name: "",
  Image: "",
  width: "80",
  height: "80",
});
const createEmptyCloud = (): CloudField => ({
  name: "",
  Image: "",
  width: "80",
  height: "80",
});

const normalizeDimension = (value: string, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const toImageMetadata = (images: ImageField[]): Pick<ProjectImage, "width" | "height">[] =>
  images
    .filter((image) => image.file)
    .map((image) => ({
      width: normalizeDimension(image.width, 1600),
      height: normalizeDimension(image.height, 900),
    }));

const toProjectTechnologies = (technologies: TechnologyField[]): ProjectTechnology[] =>
  technologies
    .map((technology) => ({
      name: technology.name.trim(),
      Image: technology.Image.trim(),
      width: normalizeDimension(technology.width, 80),
      height: normalizeDimension(technology.height, 80),
    }))
    .filter((technology) => technology.name.length > 0 || technology.Image.length > 0);

const toProjectCloudProviders = (providers: CloudField[]): ProjectCloudProvider[] =>
  providers
    .map((provider) => ({
      name: provider.name.trim(),
      Image: provider.Image.trim(),
      width: normalizeDimension(provider.width, 80),
      height: normalizeDimension(provider.height, 80),
    }))
    .filter((provider) => provider.name.length > 0 || provider.Image.length > 0);

interface ProjectSubmissionFormProps {
  requireToken?: boolean;
}

export const ProjectSubmissionForm = ({
  requireToken = true,
}: ProjectSubmissionFormProps) => {
  const [images, setImages] = useState<ImageField[]>([createEmptyImage()]);
  const [frameworks, setFrameworks] = useState<TechnologyField[]>([
    createEmptyTechnology(),
  ]);
  const [cloudProviders, setCloudProviders] = useState<CloudField[]>([
    createEmptyCloud(),
  ]);
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleImageDimensionChange = (
    index: number,
    key: "width" | "height",
    value: string
  ) => {
    setImages((current) =>
      current.map((image, currentIndex) =>
        currentIndex === index ? { ...image, [key]: value } : image
      )
    );
  };

  const handleImageFileChange = (index: number, files: FileList | null) => {
    const file = files?.[0] ?? null;

    setImages((current) =>
      current.map((image, currentIndex) =>
        currentIndex === index
          ? {
              ...image,
              file,
              fileName: file?.name ?? "",
            }
          : image
      )
    );
  };

  const handleFrameworkChange = (
    index: number,
    key: keyof TechnologyField,
    value: string
  ) => {
    setFrameworks((current) =>
      current.map((item, currentIndex) =>
        currentIndex === index
          ? { ...item, [key]: value }
          : item
      )
    );
  };

  const handleCloudChange = (
    index: number,
    key: keyof CloudField,
    value: string
  ) => {
    setCloudProviders((current) =>
      current.map((item, currentIndex) =>
        currentIndex === index
          ? { ...item, [key]: value }
          : item
      )
    );
  };

  const addImage = () => setImages((current) => [...current, createEmptyImage()]);
  const addFramework = () =>
    setFrameworks((current) => [...current, createEmptyTechnology()]);
  const addCloud = () =>
    setCloudProviders((current) => [...current, createEmptyCloud()]);

  const removeImage = (index: number) =>
    setImages((current) => current.filter((_, currentIndex) => currentIndex !== index));
  const removeFramework = (index: number) =>
    setFrameworks((current) =>
      current.filter((_, currentIndex) => currentIndex !== index)
    );
  const removeCloud = (index: number) =>
    setCloudProviders((current) =>
      current.filter((_, currentIndex) => currentIndex !== index)
    );

  const resetForm = () => {
    setImages([createEmptyImage()]);
    setFrameworks([createEmptyTechnology()]);
    setCloudProviders([createEmptyCloud()]);
  };

  const hasImages = useMemo(
    () => images.some((image) => Boolean(image.file)),
    [images]
  );

  return (
    <form
      className="space-y-10"
      ref={formRef}
      action={(formData) => {
        const preparedMetadata = toImageMetadata(images);
        const preparedFrameworks = toProjectTechnologies(frameworks);
        const preparedClouds = toProjectCloudProviders(cloudProviders);

        formData.set("imageMetadata", JSON.stringify(preparedMetadata));
        formData.set("frameworks", JSON.stringify(preparedFrameworks));
        formData.set("cloud", JSON.stringify(preparedClouds));

        images
          .map((image) => image.file)
          .filter((file): file is File => Boolean(file))
          .forEach((file) => {
            formData.append("imageFiles", file);
          });

        setStatus({ type: "idle", message: "" });
        startTransition(async () => {
          const response = await createProject(formData);
          setStatus({
            type: response.success ? "success" : "error",
            message: response.message,
          });
          if (response.success) {
            resetForm();
            formRef.current?.reset();
          }
        });
      }}
    >
      <section className="grid gap-6 md:grid-cols-2">
        {requireToken && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200" htmlFor="token">
              Submission token
            </label>
            <input
              required
              name="token"
              id="token"
              type="password"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              placeholder="Enter the secret token"
            />
            <p className="text-xs text-gray-400">
              Define <code>PROJECT_SUBMISSION_TOKEN</code> in your environment and use it here to protect the form.
            </p>
          </div>
        )}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-200" htmlFor="id">
            Project ID (slug)
          </label>
          <input
            required
            name="id"
            id="id"
            type="text"
            pattern="[a-z0-9-]+"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            placeholder="e.g. nextjs-portfolio"
          />
          <p className="text-xs text-gray-400">
            Lowercase letters, numbers, and hyphens only. This becomes the URL path.
          </p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-200" htmlFor="name">
            Project name
          </label>
          <input
            required
            name="name"
            id="name"
            type="text"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            placeholder="Enter the project title"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-200" htmlFor="link">
            Live link (optional)
          </label>
          <input
            name="link"
            id="link"
            type="url"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            placeholder="https://example.com"
          />
        </div>
      </section>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-200" htmlFor="description">
          Project description
        </label>
        <textarea
          required
          name="description"
          id="description"
          rows={4}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
          placeholder="Describe what the project does and why it matters."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-200" htmlFor="remark">
          Personal contribution (optional)
        </label>
        <textarea
          name="remark"
          id="remark"
          rows={3}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
          placeholder="Share highlights such as your role, achievements, or results."
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-100">Project images</h2>
          <button
            type="button"
            className="rounded-lg border border-orange-600 px-3 py-1 text-sm font-medium text-orange-400 transition hover:bg-orange-600/10"
            onClick={addImage}
          >
            Add image
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Provide at least one image to feature the project. Files are uploaded to your Supabase bucket automatically and shown
          in the preview carousel.
        </p>
        <div className="space-y-4">
          {images.map((image, index) => (
            <div
              key={`image-${index}`}
              className="rounded-xl border border-gray-800 bg-gray-900/70 p-4 shadow-inner"
            >
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Project image
                  </label>
                  <input
                    required={!hasImages && index === 0}
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageFileChange(index, event.target.files)}
                    className="w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-orange-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-orange-500"
                  />
                  <p className="text-xs text-gray-500">
                    {image.fileName ? `Selected: ${image.fileName}` : "PNG, JPG, or WEBP images work best."}
                  </p>
                </div>
                <div className="grid flex-shrink-0 grid-cols-2 gap-4 md:w-56">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Width
                    </label>
                    <input
                      type="number"
                      value={image.width}
                      onChange={(event) =>
                        handleImageDimensionChange(index, "width", event.target.value)
                      }
                      className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Height
                    </label>
                    <input
                      type="number"
                      value={image.height}
                      onChange={(event) =>
                        handleImageDimensionChange(index, "height", event.target.value)
                      }
                      className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    />
                  </div>
                </div>
              </div>
              {images.length > 1 && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-sm text-gray-400 underline-offset-4 transition hover:text-orange-400 hover:underline"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-100">Frameworks & libraries</h2>
          <button
            type="button"
            className="rounded-lg border border-orange-600 px-3 py-1 text-sm font-medium text-orange-400 transition hover:bg-orange-600/10"
            onClick={addFramework}
          >
            Add framework
          </button>
        </div>
        <div className="space-y-4">
          {frameworks.map((framework, index) => (
            <div
              key={`framework-${index}`}
              className="rounded-xl border border-gray-800 bg-gray-900/70 p-4 shadow-inner"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Name
                  </label>
                  <input
                    value={framework.name}
                    onChange={(event) =>
                      handleFrameworkChange(index, "name", event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    placeholder="Next.js"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Icon URL
                  </label>
                  <input
                    value={framework.Image}
                    onChange={(event) =>
                      handleFrameworkChange(index, "Image", event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    placeholder="/next.png"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Width
                  </label>
                  <input
                    type="number"
                    value={framework.width}
                    onChange={(event) =>
                      handleFrameworkChange(index, "width", event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Height
                  </label>
                  <input
                    type="number"
                    value={framework.height}
                    onChange={(event) =>
                      handleFrameworkChange(index, "height", event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>
              </div>
              {frameworks.length > 1 && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeFramework(index)}
                    className="text-sm text-gray-400 underline-offset-4 transition hover:text-orange-400 hover:underline"
                  >
                    Remove framework
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-100">Cloud & infrastructure</h2>
          <button
            type="button"
            className="rounded-lg border border-orange-600 px-3 py-1 text-sm font-medium text-orange-400 transition hover:bg-orange-600/10"
            onClick={addCloud}
          >
            Add provider
          </button>
        </div>
        <div className="space-y-4">
          {cloudProviders.map((provider, index) => (
            <div
              key={`cloud-${index}`}
              className="rounded-xl border border-gray-800 bg-gray-900/70 p-4 shadow-inner"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Name
                  </label>
                  <input
                    value={provider.name}
                    onChange={(event) =>
                      handleCloudChange(index, "name", event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    placeholder="Vercel"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Icon URL
                  </label>
                  <input
                    value={provider.Image}
                    onChange={(event) =>
                      handleCloudChange(index, "Image", event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    placeholder="/vercel.svg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Width
                  </label>
                  <input
                    type="number"
                    value={provider.width}
                    onChange={(event) =>
                      handleCloudChange(index, "width", event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Height
                  </label>
                  <input
                    type="number"
                    value={provider.height}
                    onChange={(event) =>
                      handleCloudChange(index, "height", event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>
              </div>
              {cloudProviders.length > 1 && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeCloud(index)}
                    className="text-sm text-gray-400 underline-offset-4 transition hover:text-orange-400 hover:underline"
                  >
                    Remove provider
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {status.message && (
        <div
          role="status"
          className={`rounded-lg border px-4 py-3 text-sm font-medium ${
            status.type === "success"
              ? "border-emerald-600/40 bg-emerald-600/10 text-emerald-200"
              : status.type === "error"
              ? "border-red-600/40 bg-red-600/10 text-red-200"
              : "border-gray-700 bg-gray-900 text-gray-300"
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        <button
          type="reset"
          className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800"
          onClick={() => {
            resetForm();
            setStatus({ type: "idle", message: "" });
          }}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:from-orange-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Saving...
            </span>
          ) : (
            "Save project"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectSubmissionForm;
