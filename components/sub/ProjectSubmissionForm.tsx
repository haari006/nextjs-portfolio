"use client";

import { useMemo, useState, useTransition } from "react";
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

const createEmptyImage = (): ProjectImage => ({ src: "", width: 100, height: 100 });
const createEmptyTechnology = (): ProjectTechnology => ({
  name: "",
  Image: "",
  width: 80,
  height: 80,
});
const createEmptyCloud = (): ProjectCloudProvider => ({
  name: "",
  Image: "",
  width: 80,
  height: 80,
});

const removeEmptyItems = <T extends object>(items: T[]) =>
  items.filter((item) =>
    Object.values(item as Record<string, unknown>).some(
      (value) => value !== ""
    )
  );

interface ProjectSubmissionFormProps {
  requireToken?: boolean;
}

export const ProjectSubmissionForm = ({
  requireToken = true,
}: ProjectSubmissionFormProps) => {
  const [images, setImages] = useState<ProjectImage[]>([createEmptyImage()]);
  const [frameworks, setFrameworks] = useState<ProjectTechnology[]>([
    createEmptyTechnology(),
  ]);
  const [cloudProviders, setCloudProviders] = useState<ProjectCloudProvider[]>([
    createEmptyCloud(),
  ]);
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [isPending, startTransition] = useTransition();

  const handleImageChange = (
    index: number,
    key: keyof ProjectImage,
    value: string
  ) => {
    setImages((current) =>
      current.map((image, currentIndex) =>
        currentIndex === index
          ? { ...image, [key]: key === "src" ? value : Number(value) }
          : image
      )
    );
  };

  const handleFrameworkChange = (
    index: number,
    key: keyof ProjectTechnology,
    value: string
  ) => {
    setFrameworks((current) =>
      current.map((item, currentIndex) =>
        currentIndex === index
          ? { ...item, [key]: key === "name" || key === "Image" ? value : Number(value) }
          : item
      )
    );
  };

  const handleCloudChange = (
    index: number,
    key: keyof ProjectCloudProvider,
    value: string
  ) => {
    setCloudProviders((current) =>
      current.map((item, currentIndex) =>
        currentIndex === index
          ? { ...item, [key]: key === "name" || key === "Image" ? value : Number(value) }
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
    () => images.some((image) => image.src.trim().length > 0),
    [images]
  );

  return (
    <form
      className="space-y-10"
      action={(formData) => {
        const preparedImages = removeEmptyItems(images);
        const preparedFrameworks = removeEmptyItems(frameworks);
        const preparedClouds = removeEmptyItems(cloudProviders);

        formData.set("images", JSON.stringify(preparedImages));
        formData.set("frameworks", JSON.stringify(preparedFrameworks));
        formData.set("cloud", JSON.stringify(preparedClouds));

        setStatus({ type: "idle", message: "" });
        startTransition(async () => {
          const response = await createProject(formData);
          setStatus({
            type: response.success ? "success" : "error",
            message: response.message,
          });
          if (response.success) {
            resetForm();
            (document.getElementById("project-form") as HTMLFormElement | null)?.reset();
          }
        });
      }}
      id="project-form"
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
          Provide at least one image to feature the project. Images are displayed in the preview carousel.
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
                    Image URL
                  </label>
                  <input
                    required={!hasImages}
                    value={image.src}
                    onChange={(event) => handleImageChange(index, "src", event.target.value)}
                    placeholder="https://"
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>
                <div className="grid flex-shrink-0 grid-cols-2 gap-4 md:w-56">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Width
                    </label>
                    <input
                      type="number"
                      value={image.width}
                      onChange={(event) => handleImageChange(index, "width", event.target.value)}
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
                      onChange={(event) => handleImageChange(index, "height", event.target.value)}
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
