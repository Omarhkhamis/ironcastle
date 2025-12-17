import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { getSessionAdmin } from "../../../lib/auth";

export default async function DashboardLoginPage() {
  const admin = await getSessionAdmin();
  if (admin) {
    redirect("/dashboard/overview");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0b0f14] via-[#0f151d] to-[#131a24] px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="Iron Castle" className="h-12 w-auto" />
          </div>
          <p className="mt-4 text-sm text-gray-200">Sign in to manage Iron Castle content.</p>
        </div>

        <LoginForm />

        <div className="mt-4 text-center text-sm text-gray-300">
          <Link href="/" className="text-accent hover:underline">
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
