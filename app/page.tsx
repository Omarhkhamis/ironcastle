"use client";

import { useMemo, useState } from "react";
import About from "../components/About";
import Partners from "../components/Partners";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProjectsSection from "../components/Projects";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import {
  partners,
  filterOptions,
  navItems,
  projects,
  services,
  stats,
  whyUsItems
} from "../components/data";
import { useTheme } from "../components/ThemeProvider";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const { theme, toggleTheme } = useTheme();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) =>
      project.categories.includes(activeFilter)
    );
  }, [activeFilter]);

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
        <Hero onNavigate={handleNavClick} />
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
        <Contact onNavigate={handleNavClick} />
      </main>

      <section className="border-t border-graymid bg-white px-5 py-6 dark:border-white/10 dark:bg-[#0f1116]">
        <div className="mx-auto max-w-6xl text-center text-sm text-graymain dark:text-gray-300">
          © 2025 iron castle. All rights reserved. develobed by{" "}
          <a
            href="https://nexdigital.cloud/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-dark hover:text-accent dark:text-white"
          >
            Nexdigital
          </a>
        </div>
      </section>
    </div>
  );
}
