import { cardClass, SectionHeading } from "../../../../components/dashboard/ui";
import { getSiteData } from "../../../../lib/site-data";
import SEOForm from "../../../../components/dashboard/SEOForm";

export default async function SEOPage() {
  const data = await getSiteData();
  const setting = data.setting;

  return (
    <section className="space-y-6">
      <SectionHeading title="SEO" description="Control metadata and structured data for search engines." />
      <div className={cardClass}>
        <SEOForm setting={setting} />
      </div>
    </section>
  );
}
