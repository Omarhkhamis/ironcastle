"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { logout } from "../../app/dashboard/auth-actions";
import { dashboardLinks } from "./links";
import ThemeToggleButton from "./ThemeToggleButton";

type Props = {
  admin: { name?: string | null; email: string };
};

export default function DashboardSidebar({ admin }: Props) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <aside className="hidden md:flex fixed inset-y-0 w-64 flex-col border-r border-graymid/60 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-[#080b12]/80">
      <div className="flex items-center justify-center border-b border-graymid/60 px-5 py-5 dark:border-white/10">
        <img src="/logo.png" alt="Iron Castle" className="h-12 w-auto" />
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="mb-4">
          <ThemeToggleButton />
        </div>
        <ul className="space-y-2">
          {dashboardLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-accent text-[#111]"
                      : "text-gray-600 hover:bg-graylight dark:text-gray-300 dark:hover:bg-white/10"
                  }`}
                >
                  <i className={`${link.icon} text-base`} aria-hidden />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-graymid/60 px-4 py-5 text-sm dark:border-white/10">
        <div className="mb-3">
          <p className="font-semibold text-dark dark:text-white">{admin.name || "Administrator"}</p>
          <p className="text-gray-500 dark:text-gray-300">{admin.email}</p>
        </div>
        <button
          type="button"
          onClick={() => startTransition(() => logout())}
          disabled={isPending}
          className="w-full rounded-xl border border-graymid/60 px-4 py-2 font-semibold text-gray-700 transition hover:border-accent hover:text-accent disabled:opacity-60 dark:border-white/15 dark:text-gray-200"
        >
          {isPending ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
