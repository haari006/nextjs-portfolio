"use client";

import { useState, useTransition } from "react";
import { authorizeProjectSubmission } from "@/actions/projects";

interface GateStatus {
  type: "idle" | "success" | "error";
  message: string;
}

const ProjectSubmissionGate = () => {
  const [status, setStatus] = useState<GateStatus>({ type: "idle", message: "" });
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="space-y-6"
      action={(formData) => {
        setStatus({ type: "idle", message: "" });
        startTransition(async () => {
          const response = await authorizeProjectSubmission(formData);
          setStatus({
            type: response.success ? "success" : "error",
            message: response.message,
          });

          if (response.success) {
            window.location.reload();
          }
        });
      }}
    >
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
          autoComplete="off"
        />
        <p className="text-xs text-gray-400">
          Project submissions are locked behind your personal token. Share the portfolio freely—only you can unlock this form.
        </p>
      </div>

      {status.message && (
        <div
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

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Checking…" : "Unlock project submission"}
      </button>
    </form>
  );
};

export default ProjectSubmissionGate;
