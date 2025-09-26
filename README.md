# Portfolio

## Introduction

This portfolio is built using modern web technologies to showcase projects and skills in a clean and visually appealing manner. It is inspired by the following frameworks and libraries:

- **Next.js**: A React framework for building server-side rendered (SSR) and statically generated applications.
- **TypeScript**: A statically typed superset of JavaScript that enhances code quality and developer productivity.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs without writing traditional CSS.
- **Three.js**: A JavaScript library for creating 3D graphics on the web, enabling interactive and immersive experiences.
- **Framer Motion**: A library for adding animations and transitions to React components with ease.

---

### Getting Started

To run this portfolio locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.
4. Open your browser and navigate to `http://localhost:3000`.

#### Quick project submissions (no code editor required)

1. Set the `PROJECT_SUBMISSION_TOKEN` environment variable locally (e.g. in a `.env.local` file) and on your hosting provider. This protects the submission form from public access.
2. (Optional) To store projects and images in Supabase instead of the local JSON fallback, add the following environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_PROJECTS_BUCKET` (defaults to `project-images` if omitted)

   Create a `projects` table with the columns `id`, `name`, `description`, `remark`, `link` (text/varchar) and JSONB columns for `images`, `frameworks`, and `cloud`. Then create a public storage bucket matching `SUPABASE_PROJECTS_BUCKET` so project screenshots can be uploaded automatically.
3. Visit `/universe/planets/new` to open the submission dashboard. Fill out the form and provide the submission token when asked. Projects appear instantly after saving.

---

### Features

- **Next.js**: Utilizes Next.js for server-side rendering and optimized performance.
- **TypeScript**: Enhances codebase with type safety and improved maintainability.
- **Tailwind CSS**: Enables rapid styling and customization of components.
- **Three.js**: Integrates 3D graphics for interactive and engaging content.
- **Framer Motion**: Adds smooth animations and transitions to enhance user experience.

---

### Deployment

This portfolio can be easily deployed to various platforms, including Vercel, Netlify, or custom hosting solutions.

---

### Credits

This project is inspired from @nikhilmaguwala's portfolio template. Thanks to the creators of Next.js, TypeScript, Tailwind CSS, Three.js and Framer Motion for building amazing open source tools.

---