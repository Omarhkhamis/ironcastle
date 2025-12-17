"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import About from "./About";
import Partners from "./Partners";
import Contact from "./Contact";
import Header from "./Header";
import Hero from "./Hero";
import ProjectsSection from "./Projects";
import Services from "./Services";
import WhyUs from "./WhyUs";
import type {
  FilterOption,
  NavItem,
  Partner,
  Project,
  Service,
  Stat,
  WhyUsItem
} from "./data";
import { useTheme } from "./ThemeProvider";

type SocialLink = { id: number; platform: string; url: string };

type SettingInfo = {
  siteName?: string | null;
  contactEmail?: string | null;
  phone?: string | null;
  address?: string | null;
  heroImageUrl?: string | null;
  businessHours?: string | null;
  mapEmbed?: string | null;
  socials?: SocialLink[];
};

type Props = {
  projects: Project[];
  services: Service[];
  partners: Partner[];
  navItems: NavItem[];
  stats: Stat[];
  whyUsItems: WhyUsItem[];
  setting?: SettingInfo | null;
};

const defaultSocials: SocialLink[] = [];

const socialIcons: Record<string, ReactNode> = {
  facebook: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M15.117 8.475H17V6h-1.883C12.8 6 12 7.605 12 9.383V11H10v2h2v5h2v-5h2v-2h-2V9.383c0-.652.121-.908 1.117-.908Z" />
    </svg>
  ),
  instagram: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M7.75 4h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4Zm0 1.5A2.25 2.25 0 0 0 5.5 7.75v8.5A2.25 2.25 0 0 0 7.75 18.5h8.5a2.25 2.25 0 0 0 2.25-2.25v-8.5A2.25 2.25 0 0 0 16.25 5.5h-8.5Zm8 1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
    </svg>
  ),
  tiktok: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M14.5 5c.464.692 1.177 1.198 2 1.386V8.75a4.16 4.16 0 0 1-2-.62v4.697a4.827 4.827 0 1 1-4.827-4.825c.203 0 .402.017.599.05V9.75a2.877 2.877 0 1 0 2.081 2.77V3h2.147C14.5 3.7 14.5 5 14.5 5Z" />
    </svg>
  ),
  linkedin: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M6.94 5.5A1.45 1.45 0 1 1 5.5 4.06 1.45 1.45 0 0 1 6.94 5.5ZM5.75 8h2.38v10.44H5.75Zm4.2 0h2.28v1.43h.03c.31-.59 1.08-1.21 2.22-1.21 2.38 0 2.82 1.57 2.82 3.61v6.61h-2.39v-5.86c0-1.4-.02-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1v5.96H9.95Z" />
    </svg>
  ),
  whatsapp: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2a9.94 9.94 0 0 0-8.45 15.39L2 22l4.78-1.49A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.59 12.59l-.28.38a1 1 0 0 0-.12 1l.39.95-1.01.31-1.29.39a1 1 0 0 0-.32.15A8 8 0 0 1 4 12a8 8 0 0 1 8-8Zm-2.46 4.5a.7.7 0 0 0-.54.34c-.19.3-.5.88-.5 1.64 0 1.43.93 2.82 1.07 3 .13.18 1.83 2.94 4.52 4 .41.17.82.16 1.13.1.35-.06 1.08-.44 1.23-.86s.15-.78.1-.86-.16-.13-.34-.23c-.18-.1-1.08-.54-1.25-.6s-.29-.09-.41.09c-.12.18-.47.6-.57.72-.11.12-.21.13-.39.04-.18-.09-.77-.28-1.47-.89-.53-.47-.89-1.04-1-1.22-.1-.18-.01-.27.07-.36.07-.07.18-.2.27-.3.09-.1.12-.18.18-.3s.03-.24-.01-.34c-.04-.09-.41-1.04-.57-1.42-.15-.39-.33-.34-.44-.35z" />
    </svg>
  )
};

function getSocialIcon(label: string) {
  const key = label.toLowerCase();
  return socialIcons[key] ?? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 3v5.25l4.5 2.67-.75 1.23-5.25-3.15V7h1.5Z" />
    </svg>
  );
}

export default function HomeClient({
  projects,
  services,
  partners,
  navItems,
  stats,
  whyUsItems,
  setting
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const { theme, toggleTheme } = useTheme();

  const socialLinks = setting?.socials?.length ? setting.socials : defaultSocials;

  const filterOptions = useMemo<FilterOption[]>(() => {
    const unique = new Set<string>();
    projects.forEach((project) => {
      project.categories?.forEach((category) => {
        if (category) unique.add(category);
      });
    });
    return [
      { label: "All Projects", value: "all" },
      ...Array.from(unique).map((value) => ({
        value,
        label: value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
      }))
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.categories?.includes(activeFilter));
  }, [activeFilter, projects]);

  const handleNavClick = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        navItems={navItems}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={handleNavClick}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      <main id="top" className="flex-1">
        <Hero onNavigate={handleNavClick} heroImageUrl={setting?.heroImageUrl} />
        <About stats={stats} />
        <Services services={services} />
        <ProjectsSection
          activeFilter={activeFilter}
          filterOptions={filterOptions}
          projects={filteredProjects}
          onFilterChange={setActiveFilter}
        />
        <WhyUs items={whyUsItems} />
        <Partners partners={partners} />
        <Contact
          onNavigate={handleNavClick}
          contactEmail={setting?.contactEmail}
          phone={setting?.phone}
          address={setting?.address}
          businessHours={setting?.businessHours}
          mapEmbed={setting?.mapEmbed}
          socials={socialLinks}
        />
      </main>

      <section className="border-t border-graymid bg-white px-5 py-6 dark:border-white/10 dark:bg-[#0f1116]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-graymain dark:text-gray-300 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <span className="font-semibold text-dark dark:text-white">
              © {new Date().getFullYear()} {setting?.siteName || "Iron Castle"}.
            </span>{" "}
            All rights reserved. Developed by{" "}
            <a
              href="https://nexdigital.cloud/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-dark hover:text-accent dark:text-white"
            >
              Nexdigital
            </a>
          </div>

          <div className="flex items-center gap-3 sm:justify-end">
            {socialLinks.length === 0 ? (
              <span className="text-sm text-graymain dark:text-gray-400">No social links yet.</span>
            ) : (
              socialLinks.map((item) => (
                <a
                  key={`${item.platform}-${item.url}`}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.platform}
                  className="group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-graymid bg-white text-dark shadow-soft transition hover:-translate-y-0.5 hover:border-accent hover:text-white dark:border-white/10 dark:bg-[#0c0e12] dark:text-gray-100"
                >
                  <span className="absolute inset-0 scale-0 bg-gradient-to-br from-accent to-[#ffb341] opacity-0 transition duration-200 group-hover:scale-100 group-hover:opacity-100" />
                  <span className="relative">{getSocialIcon(item.platform)}</span>
                </a>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
