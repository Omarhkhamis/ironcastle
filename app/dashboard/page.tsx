import { redirect } from "next/navigation";
import { getSessionAdmin } from "../../lib/auth";

export default async function DashboardIndex() {
  const admin = await getSessionAdmin();
  redirect(admin ? "/dashboard/overview" : "/dashboard/login");
}
