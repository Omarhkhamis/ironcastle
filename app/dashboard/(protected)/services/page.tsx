import { SectionHeading } from "../../../../components/dashboard/ui";
import ServicesManager from "../../../../components/dashboard/ServicesManager";
import { getSiteData } from "../../../../lib/site-data";

export default async function ServicesPage() {
  const data = await getSiteData();
  const services = data.services.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    icon: service.icon,
    order: service.order
  }));

  return (
    <section className="space-y-6">
      <SectionHeading title="Services" description="Control offerings displayed on the site" />
      <ServicesManager services={services} />
    </section>
  );
}
