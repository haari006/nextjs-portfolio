"use server";

import { revalidatePath } from "next/cache";
import type {
  ProjectCloudProvider,
  ProjectImage,
  ProjectTechnology,
} from "@/constants/type";
import { saveProject } from "@/lib/projectStore";

export interface ProjectActionResponse {
  success: boolean;
  message: string;
}

const parseJsonArray = <T>(
  raw: FormDataEntryValue | null,
  label: string
): { value: T[]; error?: string } => {
  if (!raw) {
    return { value: [] };
  }

  try {
    const parsed = JSON.parse(String(raw));
    if (!Array.isArray(parsed)) {
      return { value: [], error: `${label} must be an array.` };
    }

    return { value: parsed as T[] };
  } catch (error) {
    return { value: [], error: `Unable to parse ${label}.` };
  }
};

const normalizeText = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createProject = async (
  formData: FormData
): Promise<ProjectActionResponse> => {
  const token = normalizeText(formData.get("token"));
  if (!token || token !== process.env.PROJECT_SUBMISSION_TOKEN) {
    return { success: false, message: "Invalid submission token." };
  }

  const id = normalizeText(formData.get("id"));
  const name = normalizeText(formData.get("name"));
  const description = normalizeText(formData.get("description"));
  const remark = normalizeText(formData.get("remark"));
  const link = normalizeText(formData.get("link"));

  if (!id) {
    return { success: false, message: "A project id (slug) is required." };
  }

  if (!slugRegex.test(id)) {
    return {
      success: false,
      message:
        "The project id must use lowercase letters, numbers, and hyphens only.",
    };
  }

  if (!name) {
    return { success: false, message: "A project name is required." };
  }

  if (!description) {
    return { success: false, message: "Please provide a project description." };
  }

  const imagesResult = parseJsonArray<ProjectImage>(formData.get("images"), "images");
  const frameworksResult = parseJsonArray<ProjectTechnology>(
    formData.get("frameworks"),
    "frameworks"
  );
  const cloudResult = parseJsonArray<ProjectCloudProvider>(
    formData.get("cloud"),
    "cloud providers"
  );

  if (imagesResult.error || frameworksResult.error || cloudResult.error) {
    return {
      success: false,
      message:
        imagesResult.error || frameworksResult.error || cloudResult.error ||
        "The submitted project includes invalid JSON data.",
    };
  }

  const result = await saveProject({
    id,
    name,
    description,
    remark,
    link: link || undefined,
    images: imagesResult.value,
    frameworks: frameworksResult.value,
    cloud: cloudResult.value,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message ?? "Unable to save the project right now.",
    };
  }

  revalidatePath("/universe/planets");
  revalidatePath(`/universe/planets/${id}`);

  return {
    success: true,
    message: "Project saved successfully!",
  };
};
