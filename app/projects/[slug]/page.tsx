import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";

type RouteParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return {
      title: "Project Portfolio | Iron Castle UAE",
      description: "Explore Iron Castle UAE's portfolio of industrial metal fabrication projects."
    };
  }
  const project = await prisma.project.findUnique({
    where: { slug }
  });

  if (!project) {
    return {
      title: "Project Portfolio | Iron Castle UAE",
      description: "Explore Iron Castle UAE's portfolio of industrial metal fabrication projects."
    };
  }

  const description =
    project.overview ||
    `Discover ${project.title} by Iron Castle UAE, featuring ${project.categoryLabel || "custom"} fabrication and installation expertise.`;

  const url = `/projects/${project.slug}`;
  return {
    title: `${project.title} | Iron Castle UAE`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | Iron Castle UAE`,
      description,
      url,
      type: "article",
      images: project.mainImage
        ? [
            {
              url: project.mainImage,
              alt: project.title
            }
          ]
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Iron Castle UAE`,
      description,
      images: project.mainImage ? [project.mainImage] : undefined
    }
  };
}

export default async function ProjectDetail({ params }: { params: RouteParams }) {
  const { slug } = await params;
  if (!slug) {
    return notFound();
  }
  const project = await prisma.project.findUnique({
    where: { slug }
  });

  if (!project) return notFound();

  const gallery = (project.gallery ?? []).map((img) => img?.trim()).filter(Boolean) as string[];
  const orderedImages = project.mainImage ? [project.mainImage, ...gallery] : gallery;
  const mainImage = orderedImages[0] || "/logo.png";
  const secondary = orderedImages.slice(1, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9fafb] px-5 py-10 text-[#2f3233] dark:from-[#0b0f14] dark:to-[#0f151d] dark:text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <a
            href="/#projects"
            className="text-sm font-semibold text-accent transition hover:underline"
          >
            ← Back to Projects
          </a>
          <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#111]">
            {project.categoryLabel || "Project"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 items-stretch md:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl border border-graymid bg-[#0b0f14] p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
            <h1 className="text-3xl font-bold md:text-4xl">{project.title}</h1>
            {project.location && (
              <div className="mt-2 flex items-center gap-2 text-graymain dark:text-gray-200">
                <i className="fas fa-map-marker-alt text-accent" aria-hidden />
                <span>{project.location}</span>
              </div>
            )}
            <div className="mt-4 relative w-full">
              <div
                className="relative w-full overflow-hidden rounded-3xl bg-black/20"
                style={{ paddingTop: "62.5%" }}
              >
                <img
                  src={mainImage}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>

          {secondary.length ? (
            <div className="flex flex-col gap-3 md:h-full">
              {secondary.slice(0, 2).map((img, idx) => (
                <div
                  key={`${project.slug}-secondary-${idx}`}
                  className="flex-1 overflow-hidden rounded-3xl border border-graymid/50 bg-black/20 dark:border-white/10"
                >
                  <img
                    src={img}
                    alt={`${project.title} ${idx + 2}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              {secondary.length === 1 ? (
                <div
                  className="flex-1 rounded-3xl border border-graymid/30 bg-black/10 dark:border-white/5"
                >
                  <div className="flex h-full items-center justify-center text-sm text-graymain dark:text-gray-300">
                    Gallery slot
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
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
                  <div className="text-sm font-semibold text-dark dark:text-white">Category</div>
                  <div>{project.categoryLabel || "Uncategorized"}</div>
                </div>
                {project.location && (
                  <div>
                    <div className="text-sm font-semibold text-dark dark:text-white">Location</div>
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
              <a
                href="/#contact"
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 font-semibold text-[#111] shadow-accent transition hover:-translate-y-[1px] hover:shadow-accentHover"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
