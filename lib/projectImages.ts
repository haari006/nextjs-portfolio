import { randomUUID } from "crypto";
import { getSupabaseClient } from "./supabaseClient";

const defaultBucket = "project-images";

interface UploadProjectImageParams {
  projectId: string;
  file: File;
}

interface UploadProjectImageResult {
  success: boolean;
  url?: string;
  message?: string;
}

const sanitizeProjectId = (id: string) => id.replace(/[^a-z0-9-]/gi, "").toLowerCase();

const extractExtension = (fileName: string | undefined): string => {
  if (!fileName) {
    return "jpg";
  }

  const parts = fileName.split(".");
  if (parts.length < 2) {
    return "jpg";
  }

  const ext = parts.pop() ?? "jpg";
  return ext.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
};

export const uploadProjectImage = async ({
  projectId,
  file,
}: UploadProjectImageParams): Promise<UploadProjectImageResult> => {
  const bucket = process.env.SUPABASE_PROJECTS_BUCKET?.trim() || defaultBucket;

  const supabase = await getSupabaseClient("write");
  if (!supabase) {
    return {
      success: false,
      message:
        "Project image uploads require Supabase. Define SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  if (!bucket) {
    return {
      success: false,
      message: "Define SUPABASE_PROJECTS_BUCKET to enable project image uploads.",
    };
  }

  const safeProjectId = sanitizeProjectId(projectId);
  const extension = extractExtension(file.name);
  const objectPath = `${safeProjectId}/${randomUUID()}.${extension}`;

  try {
    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabase.storage.from(bucket).upload(objectPath, arrayBuffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });

    if (error) {
      console.error("Failed to upload project image", error);
      return { success: false, message: error.message };
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);

    const url = data?.publicUrl;
    if (!url) {
      return {
        success: false,
        message: "Unable to determine the public URL for the uploaded image.",
      };
    }

    return { success: true, url };
  } catch (error) {
    console.error("Unexpected error while uploading project image", error);
    return {
      success: false,
      message: "Something went wrong while uploading the project image.",
    };
  }
};
