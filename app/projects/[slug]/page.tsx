import Link from "next/link";
import { notFound } from "next/navigation";
import projectsData from "../../../data/projects.json";
import type { Project } from "../../../components/data";

export default async function ProjectDetail({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = projectsData as Project[];
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const gallery = project.gallery ?? [];
  const mainImage = gallery[0] ?? project.image;
  const secondary = gallery.slice(1, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9fafb] text-[#2f3233] dark:from-[#0b0f14] dark:to-[#0f151d] dark:text-white px-5 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/#projects"
            className="text-sm font-semibold text-accent hover:underline"
          >
            ← Back to Projects
          </Link>
          <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#111]">
            {project.categoryLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-graymid bg-white p-4 shadow-soft dark:border-white/10 dark:bg-white/5">
            <h1 className="text-3xl font-bold md:text-4xl">{project.title}</h1>
            {project.location && (
              <div className="mt-2 flex items-center gap-2 text-graymain dark:text-gray-200">
                <i className="fas fa-map-marker-alt text-accent" aria-hidden />
                <span>{project.location}</span>
              </div>
            )}
            <div className="mt-4">
              <img
                src={mainImage}
                alt={project.title}
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {secondary.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${project.title} ${idx + 2}`}
                className="h-full w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-graymid bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
              <h3 className="text-xl font-semibold">Project Overview</h3>
              <p className="mt-2 text-graymain dark:text-gray-200">
                {project.overview ??
                  "A bespoke metal fabrication project delivering durability, precision, and aesthetic value."}
              </p>
            </div>
            <div className="rounded-2xl border border-graymid bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
              <h3 className="text-xl font-semibold">Detailed Description</h3>
              <p className="mt-2 whitespace-pre-line text-graymain dark:text-gray-200">
                {project.description ??
                  "Detailed scope coming soon. Reach out to learn more about this project and how we delivered it."}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-graymid bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
              <h3 className="text-lg font-semibold">Project Details</h3>
              <div className="mt-3 space-y-2 text-graymain dark:text-gray-200">
                <div>
                  <div className="text-sm font-semibold text-dark dark:text-white">
                    Category
                  </div>
                  <div>{project.categoryLabel}</div>
                </div>
                {project.location && (
                  <div>
                    <div className="text-sm font-semibold text-dark dark:text-white">
                      Location
                    </div>
                    <div>{project.location}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-graymid bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
              <h3 className="text-lg font-semibold">Interested in this project?</h3>
              <p className="mt-2 text-graymain dark:text-gray-200">
                Get in touch with us to learn more about this project and how we can help you.
              </p>
              <Link
                href="/#contact"
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 font-semibold text-[#111] shadow-accent transition hover:-translate-y-[1px] hover:shadow-accentHover"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = projectsData as Project[];
  return projects.map((project) => ({ slug: project.slug }));
}
