import { Metadata } from "next";
import { cookies } from "next/headers";
import ProjectSubmissionForm from "@/components/sub/ProjectSubmissionForm";
import ProjectSubmissionGate from "@/components/sub/ProjectSubmissionGate";
import {
  PROJECT_SUBMISSION_COOKIE_NAME,
  PROJECT_SUBMISSION_COOKIE_VALUE,
} from "@/lib/projectSubmissionAuth";

export const metadata: Metadata = {
  title: "Submit a project",
  description: "Add a new project to the portfolio without editing code.",
};

export default function NewProjectPage() {
  const cookieStore = cookies();
  const isAuthorized =
    cookieStore.get(PROJECT_SUBMISSION_COOKIE_NAME)?.value ===
    PROJECT_SUBMISSION_COOKIE_VALUE;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900 py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6">
        <header className="space-y-4 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Add a new project
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-300 sm:text-base">
            Use this form to publish a project instantly. Unlock it with your personal submission token so that only you (or trusted collaborators) can add new work without opening your code editor.
          </p>
        </header>

        <div className="rounded-2xl border border-gray-800 bg-black/60 p-8 shadow-2xl">
          {isAuthorized ? (
            <ProjectSubmissionForm requireToken={false} />
          ) : (
            <ProjectSubmissionGate />
          )}
        </div>

        <section className="rounded-2xl border border-orange-500/40 bg-orange-500/10 p-6 text-sm text-orange-100">
          <h2 className="mb-2 text-base font-semibold uppercase tracking-wide">How it works</h2>
          <ol className="list-decimal space-y-2 pl-4 text-orange-100/90">
            <li>
              Set the <code className="rounded bg-black/40 px-1 py-0.5">PROJECT_SUBMISSION_TOKEN</code> environment variable on your hosting provider. This value protects the form from public use.
            </li>
            <li>
              Visit this page and enter the same token to unlock the submission form. Your browser stays authorized for 24 hours.
            </li>
            <li>
              (Optional) Connect a Supabase project, create a <code>projects</code> table with JSONB columns for <em>images</em>, <em>frameworks</em>, and <em>cloud</em>, and provision a public storage bucket (e.g. <code>project-images</code>). Add the URL, keys, and bucket name to your environment so uploads are stored centrally.
            </li>
            <li>
              Fill out the form and submit. The portfolio revalidates automatically so the new project appears right away.
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}
