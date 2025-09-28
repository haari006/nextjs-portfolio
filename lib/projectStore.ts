import { Planets } from "@/constants";
import type {
  Planet,
  Project,
  ProjectCloudProvider,
  ProjectImage,
  ProjectTechnology,
} from "@/constants/type";
import { promises as fs } from "fs";
import path from "path";
import { getSupabaseClient } from "./supabaseClient";

const dataDir = path.join(process.cwd(), "data");
const projectsFilePath = path.join(dataDir, "projects.json");

interface SupabaseProjectRow {
  id: string;
  name: string;
  link: string | null;
  remark: string | null;
  description: string;
  images: ProjectImage[] | null;
  frameworks: ProjectTechnology[] | null;
  cloud: ProjectCloudProvider[] | null;
  created_at?: string;
}

const toProject = (row: SupabaseProjectRow): Planet => ({
  id: row.id,
  name: row.name,
  link: row.link ?? undefined,
  remark: row.remark ?? "",
  description: row.description,
  images: Array.isArray(row.images) ? row.images : [],
  frameworks: Array.isArray(row.frameworks) ? row.frameworks : [],
  cloud: Array.isArray(row.cloud) ? row.cloud : [],
});

const mergeProjects = (base: Planet[], overrides: Planet[]): Planet[] => {
  const map = new Map<string, Planet>();
  base.forEach((project) => map.set(project.id, project));
  overrides.forEach((project) => {
    const existing = map.get(project.id);
    map.set(project.id, existing ? { ...existing, ...project } : project);
  });
  return Array.from(map.values());
};

const ensureDataDirectory = async () => {
  await fs.mkdir(dataDir, { recursive: true });
};

const readLocalProjects = async (): Promise<Planet[]> => {
  try {
    const file = await fs.readFile(projectsFilePath, "utf8");
    const data = JSON.parse(file) as Planet[];
    return mergeProjects(Planets, data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return Planets;
    }
    console.error("Failed to read local projects store", error);
    return Planets;
  }
};

const writeLocalProjects = async (projects: Planet[]) => {
  await ensureDataDirectory();
  await fs.writeFile(
    projectsFilePath,
    JSON.stringify(projects, null, 2),
    "utf8"
  );
};

export const fetchProjects = async (): Promise<Planet[]> => {
  const supabase = await getSupabaseClient("read");

  if (!supabase) {
    return readLocalProjects();
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("id, name, link, remark, description, images, frameworks, cloud")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn(
        "Falling back to local projects due to Supabase error",
        error
      );
      return readLocalProjects();
    }

    if (!data || data.length === 0) {
      return Planets;
    }

    const fetchedProjects = data.map(toProject);
    const localProjects = Planets.filter(
      (local) => !fetchedProjects.some((fetched) => fetched.id === local.id)
    );
    return [...fetchedProjects, ...localProjects];
  } catch (error) {
    console.warn(
      "Falling back to local projects due to Supabase failure",
      error
    );
    return readLocalProjects();
  }
};

export const fetchProjectById = async (id: string): Promise<Planet | null> => {
  const projects = await fetchProjects();
  return projects.find((project) => project.id === id) ?? null;
};

export const saveProject = async (
  project: Project
): Promise<{ success: boolean; message?: string }> => {
  if (!project.id) {
    return { success: false, message: "Project is missing an id." };
  }

  const supabase = await getSupabaseClient("write");
  if (supabase) {
    const { error } = await supabase.from("projects").upsert({
      id: project.id,
      name: project.name,
      link: project.link ?? null,
      remark: project.remark,
      description: project.description,
      images: project.images,
      frameworks: project.frameworks,
      cloud: project.cloud,
    });

    if (error) {
      console.error("Failed to save project in Supabase", error);
      return { success: false, message: error.message };
    }

    return { success: true };
  }

  const existing = await readLocalProjects();
  const merged = mergeProjects(existing, [project]);

  try {
    await writeLocalProjects(merged);
    return { success: true };
  } catch (error) {
    console.error("Failed to save project locally", error);
    return {
      success: false,
      message: "Unable to write project to local store.",
    };
  }
};
