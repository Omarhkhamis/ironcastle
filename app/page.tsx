import HomeClient from "../components/HomeClient";
import { navItems, stats, whyUsItems } from "../components/data";
import { getSiteData } from "../lib/site-data";

export default async function HomePage() {
  const { projects, services, partners, setting } = await getSiteData();

  const settingPayload = setting
    ? {
        siteName: setting.siteName,
        contactEmail: setting.contactEmail,
        phone: setting.phone,
        address: setting.address,
        businessHours: setting.businessHours,
        mapEmbed: setting.mapEmbed,
        heroImageUrl: setting.heroImageUrl,
        socials: setting.socials?.map((social) => ({
          id: social.id,
          platform: social.platform,
          url: social.url
        }))
      }
    : null;

  return (
    <HomeClient
      navItems={navItems}
      stats={stats}
      whyUsItems={whyUsItems}
      projects={projects}
      services={services}
      partners={partners}
      setting={settingPayload}
    />
  );
}
