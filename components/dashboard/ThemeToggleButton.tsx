"use client";

import { useMemo } from "react";
import { useTheme } from "../ThemeProvider";

type Props = {
  iconOnly?: boolean;
};

export default function ThemeToggleButton({ iconOnly = false }: Props) {
  const { theme, toggleTheme } = useTheme();

  const { icon, label, nextLabel } = useMemo(() => {
    if (theme === "dark") {
      return { icon: "fas fa-sun", label: "Light mode", nextLabel: "Switch to light mode" };
    }
    return { icon: "fas fa-moon", label: "Dark mode", nextLabel: "Switch to dark mode" };
  }, [theme]);

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={nextLabel}
        className="grid h-10 w-10 place-items-center rounded-xl border border-graymid/70 text-gray-700 transition hover:border-accent hover:text-accent dark:border-white/20 dark:text-gray-100"
      >
        <i className={icon} aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-graymid/60 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-accent hover:text-accent dark:border-white/15 dark:text-gray-200"
      aria-label={nextLabel}
    >
      <span>{label}</span>
      <i className={icon} aria-hidden />
    </button>
  );
}
