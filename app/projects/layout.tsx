"use client";

import { useState } from "react";
import Header from "../../components/Header";
import { navItems } from "../../components/data";
import { useTheme } from "../../components/ThemeProvider";

export default function ProjectsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (target: string) => {
    window.location.assign(`/#${target}`);
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
      <main className="flex-1">{children}</main>
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
