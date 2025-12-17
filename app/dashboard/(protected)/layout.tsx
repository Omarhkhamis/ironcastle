import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardSidebar from "../../../components/dashboard/Sidebar";
import { dashboardLinks } from "../../../components/dashboard/links";
import { ToastProvider } from "../../../components/dashboard/ToastProvider";
import ThemeToggleButton from "../../../components/dashboard/ThemeToggleButton";
import { getSessionAdmin } from "../../../lib/auth";

export default async function DashboardProtectedLayout({ children }: { children: ReactNode }) {
  const admin = await getSessionAdmin();
  if (!admin) {
    redirect("/dashboard/login");
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gray-100 text-dark font-normal dark:bg-[#05070d] dark:text-white">
        <DashboardSidebar admin={admin} />
        <div className="flex flex-1 flex-col md:ml-64">
        <header className="space-y-3 border-b border-graymid/60 bg-white/70 px-5 py-4 text-sm font-medium text-accent dark:border-white/10 dark:bg-[#070a10]/70 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <ThemeToggleButton iconOnly />
            <Link href="/" className="text-xs font-bold text-dark hover:text-accent dark:text-white">
              View Site
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] tracking-[0.2em]">
            {dashboardLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-graymid/60 px-3 py-1 text-[10px] font-semibold text-gray-600 dark:border-white/20 dark:text-gray-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0b0f15]">
          <div className="mx-auto max-w-5xl px-5 py-10 space-y-6">{children}</div>
        </main>
        </div>
      </div>
    </ToastProvider>
  );
}
