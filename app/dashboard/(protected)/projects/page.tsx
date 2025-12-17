import { SectionHeading } from "../../../../components/dashboard/ui";
import ProjectsManager from "../../../../components/dashboard/ProjectsManager";
import { getSiteData } from "../../../../lib/site-data";

export default async function ProjectsPage() {
  const data = await getSiteData();
  const projects = data.projects.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    categoryLabel: project.categoryLabel,
    mainImage: project.mainImage,
    location: project.location,
    categories: project.categories,
    overview: project.overview,
    description: project.description,
    gallery: project.gallery
  }));

  return (
    <section className="space-y-6">
      <SectionHeading title="Projects" description="Manage hero case studies" />
      <ProjectsManager projects={projects} />
    </section>
  );
}
