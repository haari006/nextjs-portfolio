import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabaseReadConfig = Boolean(supabaseUrl && supabaseAnonKey);
export const hasSupabaseWriteConfig = Boolean(
  supabaseUrl && supabaseServiceRoleKey
);

type SupabaseModule = typeof import("@supabase/supabase-js");

let supabaseModulePromise: Promise<SupabaseModule | null> | null = null;
let cachedSupabaseModule: SupabaseModule | null = null;

const loadSupabaseModule = async (): Promise<SupabaseModule | null> => {
  if (cachedSupabaseModule) {
    return cachedSupabaseModule;
  }

  if (!supabaseModulePromise) {
    supabaseModulePromise = import("@supabase/supabase-js")
      .then((module) => {
        cachedSupabaseModule = module;
        return module;
      })
      .catch((error: unknown) => {
        console.warn(
          "@supabase/supabase-js is not available, Supabase features are disabled.",
          error
        );
        return null;
      });
  }

  return supabaseModulePromise;
};

export const getSupabaseClient = async (
  mode: "read" | "write"
): Promise<SupabaseClient | null> => {
  if (mode === "read" && !hasSupabaseReadConfig) {
    return null;
  }

  if (mode === "write" && !hasSupabaseWriteConfig) {
    return null;
  }

  const supabaseModule = await loadSupabaseModule();
  if (!supabaseModule) {
    return null;
  }

  const key = mode === "read" ? supabaseAnonKey : supabaseServiceRoleKey;
  if (!supabaseUrl || !key) {
    return null;
  }

  return supabaseModule.createClient(supabaseUrl, key, {
    auth: { persistSession: false },
  });
};
