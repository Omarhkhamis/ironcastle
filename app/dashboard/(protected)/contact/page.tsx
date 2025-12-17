import { cardClass, SectionHeading } from "../../../../components/dashboard/ui";
import { getSiteData } from "../../../../lib/site-data";
import ContactForm from "../../../../components/dashboard/ContactForm";

export default async function ContactSettingsPage() {
  const data = await getSiteData();
  const setting = data.setting;

  return (
    <section className="space-y-6">
      <SectionHeading title="Contact" description="Manage public contact and map information" />
      <div className={cardClass}>
        <ContactForm setting={setting} />
      </div>
    </section>
  );
}
