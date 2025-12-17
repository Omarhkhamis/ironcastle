import Link from "next/link";
import type { FilterOption, Project } from "./data";

type Props = {
  filterOptions: FilterOption[];
  projects: Project[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
};

export default function ProjectsSection({
  filterOptions,
  projects,
  activeFilter,
  onFilterChange
}: Props) {
  return (
    <section
      id="projects"
      className="flex min-h-screen items-center px-5 py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 space-y-2">
          <div className="text-sm font-bold uppercase tracking-[0.08em] text-accent">
            Projects
          </div>
          <h2 className="text-3xl font-bold text-dark md:text-4xl dark:text-white">
            Proven delivery across sectors
          </h2>
          <p className="text-lg text-graymain dark:text-gray-200">
            Selected works demonstrating clean fabrication, sharp alignment, and
            dependable finishes.
          </p>
        </div>

        <div className="mb-5 flex flex-wrap gap-3">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === option.value
                  ? "border-accent bg-accent text-[#111] shadow-accent"
                  : "border-graymid bg-white text-dark dark:border-white/20 dark:bg-white/10 dark:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-graymid/80 bg-white p-8 text-center text-graymain dark:border-white/20 dark:bg-white/5 dark:text-gray-200">
            No projects published yet. Add projects from the dashboard to showcase your work here.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-[14px] border border-graymid bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/5"
            >
              <img
                src={project.mainImage}
                alt={project.title}
                className="h-56 w-full rounded-none object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111] shadow-soft dark:bg-white dark:text-[#111]">
                  View Project
                </span>
              </div>
              <div className="p-4 text-dark">
                <h3 className="text-lg font-semibold dark:text-gray-200">
                  {project.title}
                </h3>
                <p className="text-sm text-graymain dark:text-gray-300">
                  {project.categoryLabel}
                </p>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
