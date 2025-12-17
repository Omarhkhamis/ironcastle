import { cardClass, SectionHeading } from "../../../../components/dashboard/ui";
import { getSiteData } from "../../../../lib/site-data";
import { SocialLinkForm, SettingsForm } from "../../../../components/dashboard/SettingsForm";

export default async function SettingsPage() {
  const data = await getSiteData();
  const setting = data.setting;
  const socials = setting?.socials ?? [];

  return (
    <section className="space-y-6">
      <SectionHeading title="Settings" description="Brand assets and social presence" />

      <div className={cardClass}>
        <SettingsForm setting={setting} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className={cardClass}>
          <h3 className="text-lg font-semibold">Social Links</h3>
          <div className="mt-4 space-y-4">
            {socials.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-300">No social links yet.</p>
            ) : (
              socials.map((social) => (
                <SocialLinkForm key={social.id} social={social} settingId={setting?.id ?? 1} />
              ))
            )}
          </div>
        </div>

        <div className={cardClass}>
          <h3 className="text-lg font-semibold">Add Social Link</h3>
          <div className="mt-4">
            <SocialLinkForm settingId={setting?.id ?? 1} />
          </div>
        </div>
      </div>
    </section>
  );
}
