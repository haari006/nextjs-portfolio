"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type {
  ProjectCloudProvider,
  ProjectImage,
  ProjectTechnology,
} from "@/constants/type";
import { saveProject } from "@/lib/projectStore";
import { uploadProjectImage } from "@/lib/projectImages";
import {
  PROJECT_SUBMISSION_COOKIE_NAME,
  PROJECT_SUBMISSION_COOKIE_VALUE,
} from "@/lib/projectSubmissionAuth";

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

interface SubmittedImageMetadata {
  width?: number | string;
  height?: number | string;
}

const normalizeDimensionValue = (
  value: number | string | undefined,
  fallback: number
) => {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  }

  return fallback;
};

const isAuthorizedRequest = () =>
  cookies().get(PROJECT_SUBMISSION_COOKIE_NAME)?.value ===
  PROJECT_SUBMISSION_COOKIE_VALUE;

const ensureToken = (token: string): ProjectActionResponse | undefined => {
  if (!process.env.PROJECT_SUBMISSION_TOKEN) {
    return {
      success: false,
      message:
        "Project submissions are disabled. Define PROJECT_SUBMISSION_TOKEN to enable access.",
    };
  }

  if (!token || token !== process.env.PROJECT_SUBMISSION_TOKEN) {
    return { success: false, message: "Invalid submission token." };
  }

  return undefined;
};

export const authorizeProjectSubmission = async (
  formData: FormData
): Promise<ProjectActionResponse> => {
  const token = normalizeText(formData.get("token"));

  const failure = ensureToken(token);
  if (failure) {
    return failure;
  }

  cookies().set(PROJECT_SUBMISSION_COOKIE_NAME, PROJECT_SUBMISSION_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return {
    success: true,
    message: "Authorization confirmed. You can now add a project.",
  };
};

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createProject = async (
  formData: FormData
): Promise<ProjectActionResponse> => {
  if (!isAuthorizedRequest()) {
    const token = normalizeText(formData.get("token"));
    const failure = ensureToken(token);
    if (failure) {
      return failure;
    }
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

  const metadataResult = parseJsonArray<SubmittedImageMetadata>(
    formData.get("imageMetadata"),
    "image metadata"
  );
  const frameworksResult = parseJsonArray<ProjectTechnology>(
    formData.get("frameworks"),
    "frameworks"
  );
  const cloudResult = parseJsonArray<ProjectCloudProvider>(
    formData.get("cloud"),
    "cloud providers"
  );

  if (metadataResult.error || frameworksResult.error || cloudResult.error) {
    return {
      success: false,
      message:
        metadataResult.error || frameworksResult.error || cloudResult.error ||
        "The submitted project includes invalid JSON data.",
    };
  }

  const imageFiles = formData
    .getAll("imageFiles")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (imageFiles.length === 0) {
    return {
      success: false,
      message: "Please upload at least one project image.",
    };
  }

  const imageMetadata = metadataResult.value.map((item) => ({
    width: Math.round(normalizeDimensionValue(item.width, 1600)),
    height: Math.round(normalizeDimensionValue(item.height, 900)),
  }));

  if (imageMetadata.length !== imageFiles.length) {
    return {
      success: false,
      message: "Image details are missing. Please attach your images again.",
    };
  }

  const uploadedImages: ProjectImage[] = [];

  for (let index = 0; index < imageFiles.length; index++) {
    const file = imageFiles[index];
    const { width, height } = imageMetadata[index];

    const uploadResult = await uploadProjectImage({
      projectId: id,
      file,
    });

    if (!uploadResult.success || !uploadResult.url) {
      return {
        success: false,
        message:
          uploadResult.message ?? "Unable to upload the provided project images.",
      };
    }

    uploadedImages.push({
      src: uploadResult.url,
      width,
      height,
    });
  }

  const result = await saveProject({
    id,
    name,
    description,
    remark,
    link: link || undefined,
    images: uploadedImages,
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
