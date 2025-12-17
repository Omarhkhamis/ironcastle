import { SectionHeading } from "../../../../components/dashboard/ui";
import PartnersManager from "../../../../components/dashboard/PartnersManager";
import { getSiteData } from "../../../../lib/site-data";

export default async function PartnersPage() {
  const data = await getSiteData();
  const partners = data.partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    url: partner.url,
    logoUrl: partner.logoUrl
  }));

  return (
    <section className="space-y-6">
      <SectionHeading title="Partners" description="Add supporting logos and collaborators" />
      <PartnersManager partners={partners} />
    </section>
  );
}
