import { SectionHeading, cardClass } from "../../../../components/dashboard/ui";
import { getSiteData } from "../../../../lib/site-data";

export default async function OverviewPage() {
  const data = await getSiteData();
  const metrics = [
    { label: "Projects", value: data.projects.length, icon: "fas fa-diagram-project" },
    { label: "Services", value: data.services.length, icon: "fas fa-toolbox" },
    { label: "Partners", value: data.partners.length, icon: "fas fa-handshake" },
    { label: "Admins", value: data.admins.length, icon: "fas fa-user-shield" }
  ];

  return (
    <section className="space-y-6">
      <SectionHeading title="Overview" description="Key performance snapshots" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.label} className={cardClass}>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
                <i className={metric.icon} aria-hidden />
              </span>
              <div>
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{metric.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
